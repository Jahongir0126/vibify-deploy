import { Injectable, HttpException, InternalServerErrorException } from '@nestjs/common'
import { ClientTCP } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom, timeout } from 'rxjs'
import { PreferenceCommand } from './enums'
import type { PreferenceCreateRequest, PreferenceUpdateRequest, PreferenceDeleteRequest, PreferenceRetrieveAllResponse } from './interfaces'

@Injectable()
export class PreferenceService {
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

    async createPreference(payload: PreferenceCreateRequest): Promise<any> {
        return await this.#_send(PreferenceCommand.PREFERENCE_CREATE, payload)
    }
    
    async retrieveAllPreferences(): Promise<PreferenceRetrieveAllResponse[]> {
        return await this.#_send(PreferenceCommand.PREFERENCE_RETRIEVE_ALL, {})
    }

    async retrievePreference(id: string): Promise<PreferenceRetrieveAllResponse> {
        return await this.#_send(PreferenceCommand.PREFERENCE_RETRIEVE, { id })
    }
    
    async updatePreference(id: string, payload: PreferenceUpdateRequest): Promise<any> {
        return await this.#_send(PreferenceCommand.PREFERENCE_UPDATE, { id, ...payload })
    }
    
    async deletePreference(id: string): Promise<any> {
        return await this.#_send(PreferenceCommand.PREFERENCE_DELETE, { id })
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