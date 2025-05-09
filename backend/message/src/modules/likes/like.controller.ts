import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LikeService } from './like.service';
import { LikeCommand } from './enums';
import { LikeCheckDto, LikeCreateDto, LikeDeleteDto } from './dtos';

@Controller({
    path: '/likes',
    version: '1',
})
export class LikeController {
    readonly #_service: LikeService;

    constructor(service: LikeService) {
        this.#_service = service;
    }

    @MessagePattern(LikeCommand.LIKE_CHECK)
    @HttpCode(HttpStatus.OK)
    async checkLike(@Payload() payload: LikeCheckDto) {
        return await this.#_service.checkLike(payload);
    }

    @MessagePattern(LikeCommand.LIKE_CREATE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async createLike(@Payload() payload: LikeCreateDto): Promise<null> {
        await this.#_service.createLike(payload);
        return null;
    }

    @MessagePattern(LikeCommand.LIKE_DELETE)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteLike(@Payload() payload: LikeDeleteDto): Promise<null> {
        await this.#_service.deleteLike(payload);
        return null;
    }

    @MessagePattern(LikeCommand.LIKE_RETRIEVE_ALL)
    @HttpCode(HttpStatus.OK)
    async retrieveAllLikes() {
        return await this.#_service.retrieveAllLikes();
    }

    @MessagePattern(LikeCommand.LIKE_RETRIEVE_BY_USER)
    @HttpCode(HttpStatus.OK)
    async retrieveLikesByUser(@Payload() payload: { userId: string }) {
        return await this.#_service.retrieveLikesByUser(payload.userId);
    }
}
