import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateSpecialtyDto, UpdateSpecialtyDto } from './dto';

@Injectable()
export class SpecialtyService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.specialty.findMany();
    } catch (error) {
      throw new Error('Ошибка при получении списка специальностей: ' + error.message);
    }
  }

  async findById(id: string) {
    try {
      const specialty = await this.prisma.specialty.findUnique({
        where: { id },
      });
      if (!specialty) {
        throw new NotFoundException(`Специальность с ID ${id} не найдена`);
      }
      return specialty;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при получении специальности: ' + error.message);
    }
  }

  async findByName(name: string) {
    try {
      const specialty = await this.prisma.specialty.findFirst({
        where: { name },
      });
      if (!specialty) {
        throw new NotFoundException(`Специальность с названием ${name} не найдена`);
      }
      return specialty;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при поиске специальности: ' + error.message);
    }
  }

  async create(data: CreateSpecialtyDto) {
    try {
      return await this.prisma.specialty.create({
        data,
      });
    } catch (error) {
      throw new Error('Ошибка при создании специальности: ' + error.message);
    }
  }

  async update(id: string, data: UpdateSpecialtyDto) {
    try {
      const specialty = await this.prisma.specialty.findUnique({
        where: { id },
      });
      if (!specialty) {
        throw new NotFoundException(`Специальность с ID ${id} не найдена`);
      }
      return await this.prisma.specialty.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при обновлении специальности: ' + error.message);
    }
  }

  async remove(id: string) {
    try {
      const specialty = await this.prisma.specialty.findUnique({
        where: { id },
      });
      if (!specialty) {
        throw new NotFoundException(`Специальность с ID ${id} не найдена`);
      }
      return await this.prisma.specialty.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Ошибка при удалении специальности: ' + error.message);
    }
  }

  async addUserSpecialty(data: { userId: string; specialtyId: string }) {
    try {
      return await this.prisma.userProfile.update({
        where: { userId: data.userId },
        data: {
          specialtyId: data.specialtyId,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при добавлении специальности пользователю: ' + error.message);
    }
  }

  async removeUserSpecialty(userId: string) {
    try {
      return await this.prisma.userProfile.update({
        where: { userId },
        data: {
          specialtyId: null,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при удалении специальности у пользователя: ' + error.message);
    }
  }

  async addCommunitySpecialty(data: { communityId: string; specialtyId: string }) {
    try {
      return await this.prisma.community.update({
        where: { id: data.communityId },
        data: {
          specialtyId: data.specialtyId,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при добавлении специальности сообществу: ' + error.message);
    }
  }

  async removeCommunitySpecialty(communityId: string) {
    try {
      return await this.prisma.community.update({
        where: { id: communityId },
        data: {
          specialtyId: null,
        },
      });
    } catch (error) {
      throw new Error('Ошибка при удалении специальности у сообщества: ' + error.message);
    }
  }

  async getUserSpecialty(userId: string) {
    try {
      const profile = await this.prisma.userProfile.findUnique({
        where: { userId },
        include: { specialty: true },
      });
      return profile?.specialty;
    } catch (error) {
      throw new Error('Ошибка при получении специальности пользователя: ' + error.message);
    }
  }

  async getCommunitySpecialty(communityId: string) {
    try {
      const community = await this.prisma.community.findUnique({
        where: { id: communityId },
        include: { specialty: true },
      });
      return community?.specialty;
    } catch (error) {
      throw new Error('Ошибка при получении специальности сообщества: ' + error.message);
    }
  }
} 