import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { CommunityCommand } from './enums'
import type {
  CommunityCreateRequest,
  CommunityUpdateRequest,
  CommunityRetrieveAllResponse,
  JoinCommunityRequest,
  LeaveCommunityRequest,
  GetUserCommunitiesRequest,
  GetCommunityUsersRequest,
  CommunityUserResponse,
  FindCommunitiesByInterestsRequest,
  FindCommunitiesBySpecialtyRequest,
} from './interfaces'

@Injectable()
export class CommunityService {
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
      console.error('Error connecting to user service:', error)
      throw new InternalServerErrorException('Failed to connect to user service')
    }
  }

  async #_send<TRequest, TResponse>(
    pattern: string,
    payload: TRequest | null | {},
  ): Promise<TResponse> {
    try {
      await this.#_connect()
      return await firstValueFrom(
        this.#_client.send(pattern, payload).pipe(timeout(this.#_timeout)),
      )
    } catch (error) {
      if (error.name) {
        throw new HttpException(error.response, error.status)
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  async createCommunity(payload: CommunityCreateRequest): Promise<null> {
    return await this.#_send<CommunityCreateRequest, null>(
      CommunityCommand.COMMUNITY_CREATE,
      payload,
    )
  }

  async getCommunities(): Promise<CommunityRetrieveAllResponse[]> {
    return await this.#_send<{}, CommunityRetrieveAllResponse[]>(
      CommunityCommand.COMMUNITY_RETRIEVE_ALL,
      {},
    )
  }

  async getCommunity(id: string): Promise<CommunityRetrieveAllResponse> {
    return await this.#_send<{ id: string }, CommunityRetrieveAllResponse>(
      CommunityCommand.COMMUNITY_RETRIEVE,
      { id },
    )
  }

  async updateCommunity(id: string, payload: CommunityUpdateRequest): Promise<null> {
    return await this.#_send<CommunityUpdateRequest & { id: string }, null>(
      CommunityCommand.COMMUNITY_UPDATE,
      { ...payload, id },
    )
  }

  async deleteCommunity(id: string): Promise<null> {
    return await this.#_send<{ id: string }, null>(
      CommunityCommand.COMMUNITY_DELETE,
      { id },
    )
  }

  async joinCommunity(communityId: string, payload: JoinCommunityRequest): Promise<null> {
    return await this.#_send<JoinCommunityRequest & { communityId: string }, null>(
      CommunityCommand.COMMUNITY_JOIN,
      { ...payload, communityId },
    )
  }

  async leaveCommunity(communityId: string, payload: LeaveCommunityRequest): Promise<null> {
    return await this.#_send<LeaveCommunityRequest & { communityId: string }, null>(
      CommunityCommand.COMMUNITY_LEAVE,
      { ...payload, communityId },
    )
  }

  async getUserCommunities(payload: GetUserCommunitiesRequest): Promise<CommunityRetrieveAllResponse[]> {
    return await this.#_send<GetUserCommunitiesRequest, CommunityRetrieveAllResponse[]>(
      CommunityCommand.COMMUNITY_GET_USER_COMMUNITIES,
      payload,
    )
  }

  async getCommunityUsers(payload: GetCommunityUsersRequest): Promise<CommunityUserResponse[]> {
    return await this.#_send<GetCommunityUsersRequest, CommunityUserResponse[]>(
      CommunityCommand.COMMUNITY_GET_USERS,
      payload,
    )
  }

  async findCommunitiesByInterests(payload: FindCommunitiesByInterestsRequest): Promise<CommunityRetrieveAllResponse[]> {
    return await this.#_send<FindCommunitiesByInterestsRequest, CommunityRetrieveAllResponse[]>(
      CommunityCommand.COMMUNITY_FIND_BY_INTERESTS,
      payload,
    )
  }

  async findCommunitiesBySpecialty(payload: FindCommunitiesBySpecialtyRequest): Promise<CommunityRetrieveAllResponse[]> {
    return await this.#_send<FindCommunitiesBySpecialtyRequest, CommunityRetrieveAllResponse[]>(
      CommunityCommand.COMMUNITY_FIND_BY_SPECIALTY,
      payload,
    )
  }

  #_disConnect(): void {
    this.#_client.close()
  }
} 