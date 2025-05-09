import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { LikeCheckDto, LikeCreateDto} from './dtos'
import { LikeService } from '../../clients/likes/like.service';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { LikeRetrieveAllResponse } from '@clients';

@ApiTags('Likes')
@Controller({
    path: '/likes',
    version: '1',
  })
export class LikesController {

    readonly #_service: LikeService

  constructor(service: LikeService) {
    this.#_service = service
  }
    @Post('/check')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LikeCheckDto })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async checkLike(@Body() dto: LikeCheckDto): Promise<boolean> {
        return await this.#_service.checkLike(dto)
    }

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBody({ type: LikeCreateDto })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async createLike(@Body() dto: LikeCreateDto): Promise<null> {
        await this.#_service.createLike(dto)
        return null
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async deleteLike(
        @Param('id', ParseUUIDPipe) likeId: string
    ): Promise<null> {
        await this.#_service.deleteLike({ likeId })
        return null
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async retrieveAllLikes(): Promise<LikeRetrieveAllResponse[]> {
        return await this.#_service.retrieveAllLikes()
    }

    @Get('/user/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async retrieveLikesByUser(
        @Param('id', ParseUUIDPipe) userId: string
    ): Promise<LikeRetrieveAllResponse[]> {
        return await this.#_service.retrieveLikesByUser(userId)
    }
}