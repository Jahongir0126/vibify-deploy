import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { MessageService } from '@clients'
import type { MessageRetrieveResponse } from '@clients'
import { MessageCreateDto, MessageUpdateDto } from './dtos'
import {
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Message')
@Controller({
  path: '/message',
  version: '1',
})
export class MessageController {
  readonly #_service: MessageService

  constructor(service: MessageService) {
    this.#_service = service
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: MessageCreateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createMessage(@Body() payload: MessageCreateDto): Promise<null> {
    return await this.#_service.createMessage(payload)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async retrieveAllMessages(): Promise<MessageRetrieveResponse[]> {
    return await this.#_service.retrieveAllMessages()
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async retrieveMessageByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<MessageRetrieveResponse[]> {
    return await this.#_service.retrieveMessageByUser(userId)
  }

  @Put('/:messageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateMessage(
    @Param('messageId', ParseUUIDPipe) messageId: string,
    @Body() payload: MessageUpdateDto,
  ): Promise<null> {
    return await this.#_service.updateMessage(messageId, payload)
  }

  @Delete('/:messageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async deleteMessage(
    @Param('messageId', ParseUUIDPipe) messageId: string,
  ): Promise<null> {
    return await this.#_service.deleteMessage(messageId)
  }
}
