import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { SpecialtyCommand } from './enums'
import {
  SpecialtyResponse,
  CreateSpecialtyRequest,
  UpdateSpecialtyRequest,
  AddUserSpecialtyRequest,
  RemoveUserSpecialtyRequest,
  AddCommunitySpecialtyRequest,
  RemoveCommunitySpecialtyRequest,
} from './interfaces'

@Injectable()
export class SpecialtyService {
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
      console.error('Ошибка подключения к сервису специальностей:', error)
      throw new InternalServerErrorException('Не удалось подключиться к сервису специальностей')
    }
  }

  async #_send<TRequest, TResponse>(pattern: string, payload: TRequest): Promise<TResponse> {
    try {
        return await firstValueFrom(
            this.#_client.send(pattern, payload).pipe(timeout({
                first: this.#_timeout
            })),
        );
    } catch (error) {
        if (error.name) {
            throw new HttpException(error.response, error.status)
        }
        throw new InternalServerErrorException(error.name)
    }
}

  async findAll(): Promise<SpecialtyResponse[]> {
    return await this.#_send<{}, SpecialtyResponse[]>(
      SpecialtyCommand.SPECIALTY_FIND_ALL,
      {},
    )
  }

  async findById(id: string): Promise<SpecialtyResponse> {
    return await this.#_send<{ id: string }, SpecialtyResponse>(
      SpecialtyCommand.SPECIALTY_FIND_BY_ID,
      { id },
    )
  }

  async findByName(name: string): Promise<SpecialtyResponse[]> {
    return await this.#_send<{ name: string }, SpecialtyResponse[]>(
      SpecialtyCommand.SPECIALTY_FIND_BY_NAME,
      { name },
    )
  }

  async create(payload: CreateSpecialtyRequest): Promise<SpecialtyResponse> {
    return await this.#_send<CreateSpecialtyRequest, SpecialtyResponse>(
      SpecialtyCommand.SPECIALTY_CREATE,
      payload,
    )
  }

  async update(id: string, payload: UpdateSpecialtyRequest): Promise<SpecialtyResponse> {
    return await this.#_send<UpdateSpecialtyRequest & { id: string }, SpecialtyResponse>(
      SpecialtyCommand.SPECIALTY_UPDATE,
      { ...payload, id },
    )
  }

  async delete(id: string): Promise<null> {
    return await this.#_send<{ id: string }, null>(
      SpecialtyCommand.SPECIALTY_DELETE,
      { id },
    )
  }

  async addUserSpecialty(payload: AddUserSpecialtyRequest): Promise<null> {
    return await this.#_send<AddUserSpecialtyRequest, null>(
      SpecialtyCommand.SPECIALTY_ADD_USER,
      payload,
    )
  }

  async removeUserSpecialty(payload: RemoveUserSpecialtyRequest): Promise<null> {
    return await this.#_send<RemoveUserSpecialtyRequest, null>(
      SpecialtyCommand.SPECIALTY_REMOVE_USER,
      payload,
    )
  }

  async addCommunitySpecialty(payload: AddCommunitySpecialtyRequest): Promise<null> {
    return await this.#_send<AddCommunitySpecialtyRequest, null>(
      SpecialtyCommand.SPECIALTY_ADD_COMMUNITY,
      payload,
    )
  }

  async removeCommunitySpecialty(payload: RemoveCommunitySpecialtyRequest): Promise<null> {
    return await this.#_send<RemoveCommunitySpecialtyRequest, null>(
      SpecialtyCommand.SPECIALTY_REMOVE_COMMUNITY,
      payload,
    )
  }

  async getUserSpecialty(userId: string): Promise<SpecialtyResponse> {
    return await this.#_send<{ userId: string }, SpecialtyResponse>(
      SpecialtyCommand.SPECIALTY_GET_USER_SPECIALTIES,
      { userId },
    )
  }

  async getCommunitySpecialty(communityId: string): Promise<SpecialtyResponse> {
    return await this.#_send<{ communityId: string }, SpecialtyResponse>(
      SpecialtyCommand.SPECIALTY_GET_COMMUNITY_SPECIALTIES,
      { communityId },
    )
  }

  #_disConnect(): void {
    this.#_client.close()
  }
} 