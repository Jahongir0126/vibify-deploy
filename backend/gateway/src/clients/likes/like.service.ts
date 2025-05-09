import { Injectable, HttpException, InternalServerErrorException } from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { LikeCommand } from './enums'
import type { LikeCheckRequest, LikeCreateRequest, LikeDeleteRequest, LikeRetrieveAllResponse } from './interfaces'

@Injectable()
export class LikeService {
    readonly #_client: ClientTCP
    readonly #_timeout: number

    constructor(config: ConfigService) {
        this.#_client = new ClientTCP({
            host: config.getOrThrow<string>('MESSAGE_SERVICE_HOST'),
            port: config.getOrThrow<number>('MESSAGE_SERVICE_PORT')
        });

        this.#_timeout = 10000;
        
        this.#_client.connect();
    }

    async checkLike(payload: LikeCheckRequest): Promise<boolean> {
        return await this.#_send(LikeCommand.LIKE_CHECK, payload)
    }

    async createLike(payload: LikeCreateRequest): Promise<void> {
        return await this.#_send(LikeCommand.LIKE_CREATE, payload)
    }

    async deleteLike(payload: LikeDeleteRequest): Promise<void> {
        return await this.#_send(LikeCommand.LIKE_DELETE, payload)
    }

    async retrieveAllLikes(): Promise<LikeRetrieveAllResponse[]> {
        return await this.#_send(LikeCommand.LIKE_RETRIEVE_ALL, {})
    }

    async retrieveLikesByUser(userId: string): Promise<LikeRetrieveAllResponse[]> {
        return await this.#_send(LikeCommand.LIKE_RETRIEVE_BY_USER, { userId })
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
} 