import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  HttpException,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger'
import { CommunityService } from '@clients'
import {
  CreateCommunityDto,
  UpdateCommunityDto,
  JoinCommunityDto,
  LeaveCommunityDto,
  FindCommunitiesByInterestsDto,
} from './dtos'

@ApiTags('Сообщества')
@Controller('community')
export class CommunityController {
  readonly #_communityService: CommunityService

  constructor(communityService: CommunityService) {
    this.#_communityService = communityService
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Создание нового сообщества',
    description: 'Создает новое сообщество с указанными параметрами'
  })
  @ApiBody({ 
    type: CreateCommunityDto,
    description: 'Данные для создания сообщества',
    examples: {
      example1: {
        value: {
          name: 'Node.js Developers',
          description: 'Сообщество для разработчиков на Node.js',
          interestIds: ['123e4567-e89b-12d3-a456-426614174000']
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Сообщество успешно создано' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Неверные данные' 
  })
  @ApiResponse({ 
    status: HttpStatus.INTERNAL_SERVER_ERROR, 
    description: 'Внутренняя ошибка сервера' 
  })
  async createCommunity(@Body() payload: CreateCommunityDto) {
    try {
      return await this.#_communityService.createCommunity(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при создании сообщества',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение списка сообществ',
    description: 'Возвращает список всех сообществ'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список сообществ успешно получен' 
  })
  async getCommunities() {
    return this.#_communityService.getCommunities()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение сообщества по ID',
    description: 'Возвращает информацию о сообществе по его ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Информация о сообществе успешно получена' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество не найдено' 
  })
  async getCommunity(@Param('id') id: string) {
    return this.#_communityService.getCommunity(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Обновление сообщества',
    description: 'Обновляет информацию о сообществе'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdateCommunityDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Сообщество успешно обновлено' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество не найдено' 
  })
  async updateCommunity(@Param('id') id: string, @Body() payload: UpdateCommunityDto) {
    return this.#_communityService.updateCommunity(id, payload)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Удаление сообщества',
    description: 'Удаляет сообщество по его ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'Сообщество успешно удалено' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество не найдено' 
  })
  async deleteCommunity(@Param('id') id: string) {
    return this.#_communityService.deleteCommunity(id)
  }

  @Post(':id/join')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Присоединение к сообществу',
    description: 'Добавляет пользователя в сообщество'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: JoinCommunityDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Пользователь успешно присоединился к сообществу' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество не найдено' 
  })
  async joinCommunity(@Param('id') id: string, @Body() payload: JoinCommunityDto) {
    return this.#_communityService.joinCommunity(id, { userId: payload.userId })
  }

  @Post(':id/leave')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Выход из сообщества',
    description: 'Удаляет пользователя из сообщества'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: LeaveCommunityDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Пользователь успешно покинул сообщество' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество не найдено' 
  })
  async leaveCommunity(@Param('id') id: string, @Body() payload: LeaveCommunityDto) {
    return this.#_communityService.leaveCommunity(id, payload)
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение сообществ пользователя',
    description: 'Возвращает список сообществ, в которых состоит пользователь'
  })
  @ApiParam({ 
    name: 'userId', 
    description: 'ID пользователя',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список сообществ пользователя успешно получен' 
  })
  async getUserCommunities(@Param('userId') userId: string) {
    return this.#_communityService.getUserCommunities({ userId })
  }

  @Get(':id/users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение пользователей сообщества',
    description: 'Возвращает список пользователей, состоящих в сообществе'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список пользователей сообщества успешно получен' 
  })
  async getCommunityUsers(@Param('id') id: string) {
    return this.#_communityService.getCommunityUsers({ communityId: id })
  }

  @Post('search/by-interests')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Поиск сообществ по интересам',
    description: 'Возвращает список сообществ, связанных с указанными интересами'
  })
  @ApiBody({ 
    type: FindCommunitiesByInterestsDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список сообществ успешно получен' 
  })
  async findCommunitiesByInterests(@Body() payload: FindCommunitiesByInterestsDto) {
    return this.#_communityService.findCommunitiesByInterests(payload)
  }

  @Get('specialty/:specialtyId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Поиск сообществ по специальности',
    description: 'Возвращает список сообществ, связанных с указанной специальностью'
  })
  @ApiParam({ 
    name: 'specialtyId', 
    description: 'ID специальности',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список сообществ успешно получен' 
  })
  async findCommunitiesBySpecialty(@Param('specialtyId') specialtyId: string) {
    return this.#_communityService.findCommunitiesBySpecialty({ specialtyId })
  }
} 