import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { ProfileCommand } from './enums'
import type {
  ProfileCreateRequest,
  ProfileDeleteRequest,
  ProfileRetrieveAllResponse,
  ProfileUpdateRequest,
} from './interfaces'

@Injectable()
export class ProfileService {
  readonly #_client: ClientTCP
  readonly #_timeout: number

  constructor(config: ConfigService) {
    this.#_client = new ClientTCP({
      host: config.getOrThrow<string>('user.host'),
      port: config.getOrThrow<number>('user.port'),
    })

    this.#_timeout = config.getOrThrow<number>('user.timeout')
  }

  async createProfile(payload: ProfileCreateRequest): Promise<any> {
    try {
      return await this.#_send<ProfileCreateRequest, any>(
        ProfileCommand.PROFILE_CREATE,
        payload,
      )
    } catch (error) {
      throw new ConflictException(error.message)
    }
  }
  async updateProfile(payload: ProfileUpdateRequest): Promise<void> {
    return await this.#_send(ProfileCommand.PROFILE_UPDATE, payload)
  }
  async retrieveAllProfile(): Promise<ProfileRetrieveAllResponse> {
    return await this.#_send(ProfileCommand.PROFILE_RETRIEVE_ALL, {})
  }
  async retrieveProfile(payload: {
    userId: string
  }): Promise<ProfileRetrieveAllResponse> {
    return await this.#_send(ProfileCommand.PROFILE_RETRIEVE, payload)
  }
  async deleteProfile(payload: ProfileDeleteRequest): Promise<void> {
    return this.#_send(ProfileCommand.PROFILE_DELETE, payload)
  }

  //  ##################################################333

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
