import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ConfigService } from '@nestjs/config';
import type {
    MessageCreateRequest,
    MessageUpdateRequest,
    MessageRetrieveResponse,
} from './interfaces';

@Injectable()
export class MessageService {
    readonly #_prisma: PrismaService;

    constructor(
        prisma: PrismaService,
    ) {
        this.#_prisma = prisma;
    }

    async #_findMessage(messageId: string): Promise<void> {
        const message = await this.#_prisma.message.findFirst({
            where: {
                messageId,
            },
        });
        if (!message) {
            throw new NotFoundException('Message not found');
        }
    }

    async createMessage(payload: MessageCreateRequest): Promise<null> {
        try {
            await this.#_prisma.message.create({
                data: payload,
            });
            return null;
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async retrieveAllMessages(): Promise<MessageRetrieveResponse[]> {
        try {
            return await this.#_prisma.message.findMany({
                select: {
                    messageId: true,
                    senderId: true,
                    receiverId: true,
                    content: true,
                    createdAt: true,
                }
            });
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async retrieveMessageByUser(userId: string): Promise<MessageRetrieveResponse[]> {
        try {
            return await this.#_prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: userId },
                        { receiverId: userId }
                    ],
                },
                select: {
                    messageId: true,
                    senderId: true,
                    receiverId: true,
                    content: true,
                    createdAt: true,
                }
            });
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async updateMessage(messageId: string, payload: MessageUpdateRequest): Promise<null> {
        try {
            await this.#_findMessage(messageId);
            await this.#_prisma.message.update({
                where: {
                    messageId,
                },
                data: {
                    content: payload.content
                },
            });
            return null;
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }

    async deleteMessage(messageId: string): Promise<null> {
        try {
            await this.#_findMessage(messageId);
            await this.#_prisma.message.delete({
                where: {
                    messageId,
                },
            });
            return null;
        } catch (error) {
            throw new ConflictException(error.message);
        }
    }
}
