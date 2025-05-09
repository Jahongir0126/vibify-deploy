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
  Query,
  HttpException,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger'
import { InterestService } from '@clients'
import {
  CreateInterestDto,
  UpdateInterestDto,
  AddUserInterestDto,
  RemoveUserInterestDto,
  AddCommunityInterestDto,
  RemoveCommunityInterestDto,
} from './dtos'

@ApiTags('Интересы')
@Controller('interests')
export class InterestController {
  readonly #_interestService: InterestService

  constructor(interestService: InterestService) {
    this.#_interestService = interestService
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение списка интересов',
    description: 'Возвращает список всех интересов'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список интересов успешно получен' 
  })
  async findAll() {
    try {
      return await this.#_interestService.findAll()
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении списка интересов',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение интереса по ID',
    description: 'Возвращает информацию об интересе по его ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID интереса',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Интерес успешно найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Интерес не найден' 
  })
  async findById(@Param('id') id: string) {
    try {
      return await this.#_interestService.findById(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении интереса',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Поиск интересов по названию',
    description: 'Возвращает список интересов, соответствующих поисковому запросу'
  })
  @ApiQuery({ 
    name: 'name', 
    description: 'Название интереса для поиска',
    example: 'Node.js'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список найденных интересов' 
  })
  async findByName(@Query('name') name: string) {
    try {
      return await this.#_interestService.findByName(name)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при поиске интересов',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Создание нового интереса',
    description: 'Создает новый интерес с указанными параметрами'
  })
  @ApiBody({ 
    type: CreateInterestDto,
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Интерес успешно создан' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Неверные данные' 
  })
  async create(@Body() payload: CreateInterestDto) {
    try {
      return await this.#_interestService.create(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при создании интереса',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Обновление интереса',
    description: 'Обновляет информацию об интересе'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID интереса',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiBody({ 
    type: UpdateInterestDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Интерес успешно обновлен' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Интерес не найден' 
  })
  async update(@Param('id') id: string, @Body() payload: UpdateInterestDto) {
    try {
      return await this.#_interestService.update(id, payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при обновлении интереса',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Удаление интереса',
    description: 'Удаляет интерес по его ID'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID интереса',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'Интерес успешно удален' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Интерес не найден' 
  })
  async delete(@Param('id') id: string) {
    try {
      return await this.#_interestService.delete(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при удалении интереса',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Post('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Добавление интереса пользователю',
    description: 'Добавляет интерес пользователю'
  })
  @ApiBody({ 
    type: AddUserInterestDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Интерес успешно добавлен пользователю' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Пользователь или интерес не найден' 
  })
  async addUserInterest(@Body() payload: AddUserInterestDto) {
    try {
      return await this.#_interestService.addUserInterest(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при добавлении интереса пользователю',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Удаление интереса у пользователя',
    description: 'Удаляет интерес у пользователя'
  })
  @ApiBody({ 
    type: RemoveUserInterestDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Интерес успешно удален у пользователя' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Пользователь или интерес не найден' 
  })
  async removeUserInterest(@Body() payload: RemoveUserInterestDto) {
    try {
      return await this.#_interestService.removeUserInterest(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при удалении интереса у пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Post('community')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Добавление интереса сообществу',
    description: 'Добавляет интерес сообществу'
  })
  @ApiBody({ 
    type: AddCommunityInterestDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Интерес успешно добавлен сообществу' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество или интерес не найдены' 
  })
  async addCommunityInterest(@Body() payload: AddCommunityInterestDto) {
    try {
      return await this.#_interestService.addCommunityInterest(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при добавлении интереса сообществу',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete('community')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Удаление интереса у сообщества',
    description: 'Удаляет интерес у сообщества'
  })
  @ApiBody({ 
    type: RemoveCommunityInterestDto,
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Интерес успешно удален у сообщества' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество или интерес не найдены' 
  })
  async removeCommunityInterest(@Body() payload: RemoveCommunityInterestDto) {
    try {
      return await this.#_interestService.removeCommunityInterest(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при удалении интереса у сообщества',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение интересов пользователя',
    description: 'Возвращает список интересов пользователя'
  })
  @ApiParam({ 
    name: 'userId', 
    description: 'ID пользователя',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список интересов пользователя успешно получен' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Пользователь не найден' 
  })
  async getUserInterests(@Param('userId') userId: string) {
    try {
      return await this.#_interestService.getUserInterests(userId)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении интересов пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('community/:communityId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Получение интересов сообщества',
    description: 'Возвращает список интересов сообщества'
  })
  @ApiParam({ 
    name: 'communityId', 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список интересов сообщества успешно получен' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Сообщество не найдено' 
  })
  async getCommunityInterests(@Param('communityId') communityId: string) {
    try {
      return await this.#_interestService.getCommunityInterests(communityId)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении интересов сообщества',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
