import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { MessageCommand } from './enums/command-enums';
import { MessageCreateDto, MessageUpdateDto } from './dtos';
import type { MessageRetrieveResponse } from './interfaces';

@Controller({
    path: '/message',
    version: '1',
})
export class MessageController {
    readonly #_service: MessageService;

    constructor(service: MessageService) {
        this.#_service = service;
    }

    @MessagePattern(MessageCommand.MESSAGE_CREATE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async createMessage(@Payload() payload: MessageCreateDto): Promise<null> {
        await this.#_service.createMessage(payload);
        return null;
    }

    @MessagePattern(MessageCommand.MESSAGE_RETRIEVE_ALL)
    @HttpCode(HttpStatus.OK)
    async retrieveAllMessages(): Promise<MessageRetrieveResponse[]> {
        return await this.#_service.retrieveAllMessages();
    }

    @MessagePattern(MessageCommand.MESSAGE_RETRIEVE_BY_USER)
    @HttpCode(HttpStatus.OK)
    async retrieveMessageByUser(
        @Payload() payload: { userId: string }
    ): Promise<MessageRetrieveResponse[]> {
        return await this.#_service.retrieveMessageByUser(payload.userId);
    }

    @MessagePattern(MessageCommand.MESSAGE_UPDATE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateMessage(@Payload() payload: MessageUpdateDto): Promise<null> {
        await this.#_service.updateMessage(payload.messageId, payload);
        return null;
    }

    @MessagePattern(MessageCommand.MESSAGE_DELETE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteMessage(
        @Payload() payload: { messageId: string }
    ): Promise<null> {
        await this.#_service.deleteMessage(payload.messageId);
        return null;
    }
}
