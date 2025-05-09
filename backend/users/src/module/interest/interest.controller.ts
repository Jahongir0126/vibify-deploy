import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InterestService } from './interest.service';
import { InterestCommand } from './enums';
import { CreateInterestDto, UpdateInterestDto } from './dto';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @MessagePattern(InterestCommand.INTEREST_FIND_ALL)
  async findAll() {
    try {
      return await this.interestService.findAll();
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении списка интересов',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_FIND_BY_ID)
  async findById(@Payload() payload: { id: string }) {
    try {
      return await this.interestService.findById(payload.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении интереса',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_FIND_BY_NAME)
  async findByName(@Payload() payload: { name: string }) {
    try {
      return await this.interestService.findByName(payload.name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при поиске интереса',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_CREATE)
  async create(@Payload() payload: CreateInterestDto) {
    try {
      return await this.interestService.create(payload);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при создании интереса',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_UPDATE)
  async update(@Payload() payload: UpdateInterestDto & { id: string }) {
    try {
      const { id, ...data } = payload;
      return await this.interestService.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при обновлении интереса',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_DELETE)
  async delete(@Payload() payload: { id: string }) {
    try {
      return await this.interestService.remove(payload.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при удалении интереса',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_ADD_USER)
  async addUserInterest(@Payload() payload: { userId: string; interestId: string }) {
    try {
      return await this.interestService.addUserInterest(payload);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при добавлении интереса пользователю',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_REMOVE_USER)
  async removeUserInterest(@Payload() payload: { userId: string; interestId: string }) {
    try {
      return await this.interestService.removeUserInterest(payload.interestId, payload.userId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при удалении интереса у пользователя',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_ADD_COMMUNITY)
  async addCommunityInterest(@Payload() payload: { communityId: string; interestId: string }) {
    try {
      return await this.interestService.addCommunityInterest(payload);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при добавлении интереса сообществу',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_REMOVE_COMMUNITY)
  async removeCommunityInterest(@Payload() payload: { communityId: string; interestId: string }) {
    try {
      return await this.interestService.removeCommunityInterest(payload.interestId, payload.communityId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при удалении интереса у сообщества',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_GET_USER_INTERESTS)
  async getUserInterests(@Payload() payload: { userId: string }) {
    try {
      return await this.interestService.getUserInterests(payload.userId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении интересов пользователя',
      };
    }
  }

  @MessagePattern(InterestCommand.INTEREST_GET_COMMUNITY_INTERESTS)
  async getCommunityInterests(@Payload() payload: { communityId: string }) {
    try {
      return await this.interestService.getCommunityInterests(payload.communityId);
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Ошибка при получении интересов сообщества',
      };
    }
  }
} 