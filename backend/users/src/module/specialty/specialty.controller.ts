import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SpecialtyService } from './specialty.service';
import { SpecialtyCommand } from './enums';
import { CreateSpecialtyDto, UpdateSpecialtyDto } from './dto';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @MessagePattern(SpecialtyCommand.SPECIALTY_FIND_ALL)
  async findAll() {
    try {
      return await this.specialtyService.findAll();
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении списка специальностей',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_FIND_BY_ID)
  async findById(@Payload() payload: { id: string }) {
    try {
      return await this.specialtyService.findById(payload.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении специальности',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_FIND_BY_NAME)
  async findByName(@Payload() payload: { name: string }) {
    try {
      return await this.specialtyService.findByName(payload.name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при поиске специальности',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_CREATE)
  async create(@Payload() payload: CreateSpecialtyDto) {
    try {
      return await this.specialtyService.create(payload);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при создании специальности',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_UPDATE)
  async update(@Payload() payload: UpdateSpecialtyDto & { id: string }) {
    try {
      const { id, ...data } = payload;
      return await this.specialtyService.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при обновлении специальности',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_DELETE)
  async delete(@Payload() payload: { id: string }) {
    try {
      return await this.specialtyService.remove(payload.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при удалении специальности',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_ADD_USER)
  async addUserSpecialty(@Payload() payload: { userId: string; specialtyId: string }) {
    try {
      return await this.specialtyService.addUserSpecialty(payload);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при добавлении специальности пользователю',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_REMOVE_USER)
  async removeUserSpecialty(@Payload() payload: { userId: string }) {
    try {
      return await this.specialtyService.removeUserSpecialty(payload.userId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при удалении специальности у пользователя',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_ADD_COMMUNITY)
  async addCommunitySpecialty(@Payload() payload: { communityId: string; specialtyId: string }) {
    try {
      return await this.specialtyService.addCommunitySpecialty(payload);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при добавлении специальности сообществу',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_REMOVE_COMMUNITY)
  async removeCommunitySpecialty(@Payload() payload: { communityId: string }) {
    try {
      return await this.specialtyService.removeCommunitySpecialty(payload.communityId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при удалении специальности у сообщества',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_GET_USER_SPECIALTIES)
  async getUserSpecialty(@Payload() payload: { userId: string }) {
    try {
      return await this.specialtyService.getUserSpecialty(payload.userId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении специальности пользователя',
      };
    }
  }

  @MessagePattern(SpecialtyCommand.SPECIALTY_GET_COMMUNITY_SPECIALTIES)
  async getCommunitySpecialty(@Payload() payload: { communityId: string }) {
    try {
      return await this.specialtyService.getCommunitySpecialty(payload.communityId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении специальности сообщества',
      };
    }
  }
} 