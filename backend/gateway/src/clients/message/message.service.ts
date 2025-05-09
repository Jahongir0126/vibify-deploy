import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { MessageCommand } from './enums'
import type {
  MessageCreateRequest,
  MessageUpdateRequest,
  MessageRetrieveResponse,
} from './interfaces'

@Injectable()
export class MessageService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('message.host'),
      port: config.getOrThrow<number>('message.port'),
    })

    this.#_timeout = config.getOrThrow<number>('message.timeout')
  }

  async createMessage(payload: MessageCreateRequest): Promise<null> {
    try {
      return await this.#_send<MessageCreateRequest, null>(
        MessageCommand.MESSAGE_CREATE,
        payload,
      )
    } catch (error) {
      throw new ConflictException(error.message)
    }
  }

  async retrieveAllMessages(): Promise<MessageRetrieveResponse[]> {
    return await this.#_send<{}, MessageRetrieveResponse[]>(
      MessageCommand.MESSAGE_RETRIEVE_ALL,
      {},
    )
  }

  async retrieveMessageByUser(
    userId: string,
  ): Promise<MessageRetrieveResponse[]> {
    return await this.#_send<{ userId: string }, MessageRetrieveResponse[]>(
      MessageCommand.MESSAGE_RETRIEVE_BY_USER,
      { userId },
    )
  }

  async updateMessage(
    messageId: string,
    payload: MessageUpdateRequest,
  ): Promise<null> {
    return await this.#_send<MessageUpdateRequest, null>(
      MessageCommand.MESSAGE_UPDATE,
      payload,
    )
  }

  async deleteMessage(messageId: string): Promise<null> {
    return await this.#_send<{ messageId: string }, null>(
      MessageCommand.MESSAGE_DELETE,
      { messageId },
    )
  }

  async #_connect(): Promise<void> {
    await this.#_client.connect()
  }

  #_disConnect(): void {
    this.#_client.close()
  }

  async #_send<TRequest, TResponse>(
    pattern: string,
    payload: TRequest,
  ): Promise<TResponse> {
    try {
      return await firstValueFrom(
        this.#_client.send(pattern, payload).pipe(timeout(this.#_timeout)),
      )
    } catch (error) {
      if (error.name) {
        throw new HttpException(error.response, error.status)
      }
      throw new InternalServerErrorException(error.name)
    }
  }
}
