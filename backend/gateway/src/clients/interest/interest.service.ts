import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { InterestCommand } from './enums'
import type {
  InterestResponse,
  CreateInterestRequest,
  UpdateInterestRequest,
  AddUserInterestRequest,
  RemoveUserInterestRequest,
  AddCommunityInterestRequest,
  RemoveCommunityInterestRequest,
} from './interfaces/interfaces'

@Injectable()
export class InterestService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('user.host'),
      port: config.getOrThrow<number>('user.port'),
    })

    this.#_timeout = config.getOrThrow<number>('user.timeout')
  }

  async #_connect(): Promise<void> {
    try {
      await this.#_client.connect()
    } catch (error) {
      console.error('Error connecting to interest service:', error)
      throw new InternalServerErrorException('Failed to connect to interest service')
    }
  }

  async #_send<TRequest, TResponse>(
    pattern: string,
    payload: TRequest | any,
  ): Promise<TResponse> {
    try {
      return await firstValueFrom(
        this.#_client.send(pattern, payload).pipe(timeout(this.#_timeout)),
      )
    } catch (error) {
      console.error('Error sending message:', error)
      if (error.name) {
        throw new HttpException(error.response, error.status)
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(): Promise<InterestResponse[]> {
    return await this.#_send<{}, InterestResponse[]>(
      InterestCommand.INTEREST_FIND_ALL,
      {},
    )
  }

  async findById(id: string): Promise<InterestResponse> {
    return await this.#_send<{ id: string }, InterestResponse>(
      InterestCommand.INTEREST_FIND_BY_ID,
      { id },
    )
  }

  async findByName(name: string): Promise<InterestResponse[]> {
    return await this.#_send<{ name: string }, InterestResponse[]>(
      InterestCommand.INTEREST_FIND_BY_NAME,
      { name },
    )
  }

  async create(payload: CreateInterestRequest): Promise<InterestResponse> {
    return await this.#_send<CreateInterestRequest, InterestResponse>(
      InterestCommand.INTEREST_CREATE,
      payload,
    )
  }

  async update(id: string, payload: UpdateInterestRequest): Promise<InterestResponse> {
    return await this.#_send<UpdateInterestRequest & { id: string }, InterestResponse>(
      InterestCommand.INTEREST_UPDATE,
      { ...payload, id },
    )
  }

  async delete(id: string): Promise<null> {
    return await this.#_send<{ id: string }, null>(
      InterestCommand.INTEREST_DELETE,
      { id },
    )
  }

  async addUserInterest(payload: AddUserInterestRequest): Promise<null> {
    return await this.#_send<AddUserInterestRequest, null>(
      InterestCommand.INTEREST_ADD_USER,
      payload,
    )
  }

  async removeUserInterest(payload: RemoveUserInterestRequest): Promise<null> {
    return await this.#_send<RemoveUserInterestRequest, null>(
      InterestCommand.INTEREST_REMOVE_USER,
      payload,
    )
  }

  async addCommunityInterest(payload: AddCommunityInterestRequest): Promise<null> {
    return await this.#_send<AddCommunityInterestRequest, null>(
      InterestCommand.INTEREST_ADD_COMMUNITY,
      payload,
    )
  }

  async removeCommunityInterest(payload: RemoveCommunityInterestRequest): Promise<null> {
    return await this.#_send<RemoveCommunityInterestRequest, null>(
      InterestCommand.INTEREST_REMOVE_COMMUNITY,
      payload,
    )
  }

  async getUserInterests(userId: string): Promise<InterestResponse[]> {
    return await this.#_send<{ userId: string }, InterestResponse[]>(
      InterestCommand.INTEREST_GET_USER_INTERESTS,
      { userId },
    )
  }

  async getCommunityInterests(communityId: string): Promise<InterestResponse[]> {
    return await this.#_send<{ communityId: string }, InterestResponse[]>(
      InterestCommand.INTEREST_GET_COMMUNITY_INTERESTS,
      { communityId },
    )
  }

  #_disConnect(): void {
    this.#_client.close()
  }
} 