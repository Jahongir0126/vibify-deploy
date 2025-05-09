import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { UserCommand } from './enums'
import type {
  RetrieveAllUsersResponse,
  SignInRequest,
  SignInResponse,
  SignOutRequest,
  SignUpRequest,
  SignUpResponse,
} from './interfaces'

@Injectable()
export class UserService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('user.host'),
      port: config.getOrThrow<number>('user.port'),
    })

    this.#_timeout = config.getOrThrow<number>('user.timeout')
  }

  signUp(payload: SignUpRequest): Promise<SignUpResponse> {
    return this.#_send<SignUpResponse, SignUpRequest>(
      UserCommand.AUTH_SIGN_UP,
      payload,
    )
  }

  signIn(payload: SignInRequest): Promise<SignInResponse> {
    return this.#_send<SignInResponse, SignInRequest>(
      UserCommand.AUTH_SIGN_IN,
      payload,
    )
  }
  signOut(payload: SignOutRequest): Promise<void> {
    return this.#_send<void, SignOutRequest>(UserCommand.AUTH_SIGN_OUT, payload)
  }
  deleteAccount(payload: { id: string }): Promise<void> {
    return this.#_send<void, { id: string }>(UserCommand.AUTH_DELETE, payload)
  }
  restoreAccount(payload: { id: string }): Promise<void> {
    return this.#_send<void, { id: string }>(UserCommand.AUTH_RESTORE, payload)
  }
  retrieveAllUsers(): Promise<RetrieveAllUsersResponse[]> {
    return this.#_send<RetrieveAllUsersResponse[], any>(
      UserCommand.AUTH_RETRIEVE,
      {},
    )
  }

  //  ##################################################333

  async #_connect(): Promise<void> {
    await this.#_client.connect()
  }

  #_disConnect(): void {
    this.#_client.close()
  }

  async #_send<TResponse, TRequest>(
    pattern: string,
    payload: TRequest,
  ): Promise<TResponse> {
    try {
      return await firstValueFrom(
        this.#_client
          .send<TResponse, TRequest>(pattern, payload)
          .pipe(timeout(this.#_timeout)),
      )
    } catch (error: any) {
      if (error.name) {
        throw new HttpException(error.response, error.status)
      }
      throw new InternalServerErrorException(error)
    }
  }
}
