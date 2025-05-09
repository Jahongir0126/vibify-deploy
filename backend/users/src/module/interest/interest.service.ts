import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateInterestDto, UpdateInterestDto } from './dto';

@Injectable()
export class InterestService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.interest.findMany();
    } catch (error) {
      throw new Error('Ошибка при получении списка интересов: ' + error.message);
    }
  }

  async findById(id: string) {
    try {
      const interest = await this.prisma.interest.findUnique({
        where: { id },
      });
      if (!interest) {
        throw new NotFoundException(`Интерес с ID ${id} не найден`);
      }
      return interest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при получении интереса: ' + error.message);
    }
  }

  async findByName(name: string) {
    try {
      const interest = await this.prisma.interest.findFirst({
        where: { name },
      });
      if (!interest) {
        throw new NotFoundException(`Интерес с названием ${name} не найден`);
      }
      return interest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при поиске интереса: ' + error.message);
    }
  }

  async create(data: CreateInterestDto) {
    try {
      return await this.prisma.interest.create({
        data,
      });
    } catch (error) {
      throw new Error('Ошибка при создании интереса: ' + error.message);
    }
  }

  async update(id: string, data: UpdateInterestDto) {
    try {
      const interest = await this.prisma.interest.findUnique({
        where: { id },
      });
      if (!interest) {
        throw new NotFoundException(`Интерес с ID ${id} не найден`);
      }
      return await this.prisma.interest.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при обновлении интереса: ' + error.message);
    }
  }

  async remove(id: string) {
    try {
      const interest = await this.prisma.interest.findUnique({
        where: { id },
      });
      if (!interest) {
        throw new NotFoundException(`Интерес с ID ${id} не найден`);
      }
      return await this.prisma.interest.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при удалении интереса: ' + error.message);
    }
  }

  async addUserInterest(data: { userId: string; interestId: string }) {
    try {
      return await this.prisma.userInterest.create({
        data: {
          userId: data.userId,
          interestId: data.interestId,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при добавлении интереса пользователю: ' + error.message);
    }
  }

  async removeUserInterest(interestId: string, userId: string) {
    try {
      return await this.prisma.userInterest.deleteMany({
        where: {
          interestId,
          userId,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при удалении интереса у пользователя: ' + error.message);
    }
  }

  async addCommunityInterest(data: { communityId: string; interestId: string }) {
    try {
      return await this.prisma.communityInterest.create({
        data: {
          communityId: data.communityId,
          interestId: data.interestId,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при добавлении интереса сообществу: ' + error.message);
    }
  }

  async removeCommunityInterest(interestId: string, communityId: string) {
    try {
      return await this.prisma.communityInterest.deleteMany({
        where: {
          interestId,
          communityId,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при удалении интереса у сообщества: ' + error.message);
    }
  }

  async getUserInterests(userId: string) {
    try {
      return await this.prisma.userInterest.findMany({
        where: { userId },
        include: { interest: true },
      });
    } catch (error) {
      throw new Error('Ошибка при получении интересов пользователя: ' + error.message);
    }
  }

  async getCommunityInterests(communityId: string) {
    try {
      return await this.prisma.communityInterest.findMany({
        where: { communityId },
        include: { interest: true },
      });
    } catch (error) {
      throw new Error('Ошибка при получении интересов сообщества: ' + error.message);
    }
  }
} 