import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger'
import { SpecialtyService } from '../../clients/specialty/specialty.service'
import {
  CreateSpecialtyDto,
  UpdateSpecialtyDto,
  AddUserSpecialtyDto,
  RemoveUserSpecialtyDto,
  AddCommunitySpecialtyDto,
  RemoveCommunitySpecialtyDto,
} from './dto'
import { SpecialtyResponse } from '../../clients/specialty/interfaces'

@ApiTags('Специальности')
@Controller('specialties')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение списка специальностей',
    description: 'Возвращает список всех специальностей',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список специальностей успешно получен',
  })
  async findAll(): Promise<SpecialtyResponse[]> {
    try {
      return await this.specialtyService.findAll()
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении списка специальностей',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение специальности по ID',
    description: 'Возвращает информацию о специальности по её ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID специальности',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность успешно найдена',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Специальность не найдена',
  })
  async findById(@Param('id') id: string): Promise<SpecialtyResponse> {
    try {
      return await this.specialtyService.findById(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении специальности',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get('search/name')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Поиск специальности по названию',
    description: 'Возвращает список специальностей, соответствующих поисковому запросу',
  })
  @ApiQuery({
    name: 'name',
    description: 'Название специальности для поиска',
    example: 'Веб-разработка',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список найденных специальностей',
  })
  async findByName(@Query('name') name: string): Promise<SpecialtyResponse[]> {
    try {
      return await this.specialtyService.findByName(name)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при поиске специальностей',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Создание новой специальности',
    description: 'Создает новую специальность с указанными параметрами',
  })
  @ApiBody({ type: CreateSpecialtyDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Специальность успешно создана',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Неверные данные',
  })
  async create(@Body() createSpecialtyDto: CreateSpecialtyDto): Promise<SpecialtyResponse> {
    try {
      return await this.specialtyService.create(createSpecialtyDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при создании специальности',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Обновление специальности',
    description: 'Обновляет информацию о специальности',
  })
  @ApiParam({
    name: 'id',
    description: 'ID специальности',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateSpecialtyDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность успешно обновлена',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Специальность не найдена',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<SpecialtyResponse> {
    try {
      return await this.specialtyService.update(id, updateSpecialtyDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при обновлении специальности',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Удаление специальности',
    description: 'Удаляет специальность по её ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID специальности',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Специальность успешно удалена',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Специальность не найдена',
  })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.specialtyService.delete(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при удалении специальности',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Post('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Добавление специальности пользователю',
    description: 'Добавляет специальность пользователю',
  })
  @ApiBody({ type: AddUserSpecialtyDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность успешно добавлена пользователю',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь или специальность не найдены',
  })
  async addUserSpecialty(@Body() payload: AddUserSpecialtyDto): Promise<void> {
    try {
      return await this.specialtyService.addUserSpecialty(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при добавлении специальности пользователю',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Delete('user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Удаление специальности у пользователя',
    description: 'Удаляет специальность у пользователя',
  })
  @ApiBody({ type: RemoveUserSpecialtyDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность успешно удалена у пользователя',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь или специальность не найдены',
  })
  async removeUserSpecialty(@Body() payload: RemoveUserSpecialtyDto): Promise<void> {
    try {
      return await this.specialtyService.removeUserSpecialty(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при удалении специальности у пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Post('community')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Добавление специальности сообществу',
    description: 'Добавляет специальность сообществу',
  })
  @ApiBody({ type: AddCommunitySpecialtyDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность успешно добавлена сообществу',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Сообщество или специальность не найдены',
  })
  async addCommunitySpecialty(@Body() payload: AddCommunitySpecialtyDto): Promise<void> {
    try {
      return await this.specialtyService.addCommunitySpecialty(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при добавлении специальности сообществу',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Delete('community')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Удаление специальности у сообщества',
    description: 'Удаляет специальность у сообщества',
  })
  @ApiBody({ type: RemoveCommunitySpecialtyDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность успешно удалена у сообщества',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Сообщество или специальность не найдены',
  })
  async removeCommunitySpecialty(@Body() payload: RemoveCommunitySpecialtyDto): Promise<void> {
    try {
      return await this.specialtyService.removeCommunitySpecialty(payload)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при удалении специальности у сообщества',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение специальности пользователя',
    description: 'Возвращает специальность пользователя',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность пользователя успешно получена',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  async getUserSpecialty(@Param('userId') userId: string): Promise<SpecialtyResponse> {
    try {
      return await this.specialtyService.getUserSpecialty(userId)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении специальности пользователя',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get('community/:communityId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Получение специальности сообщества',
    description: 'Возвращает специальность сообщества',
  })
  @ApiParam({
    name: 'communityId',
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Специальность сообщества успешно получена',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Сообщество не найдено',
  })
  async getCommunitySpecialty(@Param('communityId') communityId: string): Promise<SpecialtyResponse> {
    try {
      return await this.specialtyService.getCommunitySpecialty(communityId)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }
      throw new HttpException(
        'Ошибка при получении специальности сообщества',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
