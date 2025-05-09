import { Injectable } from '@nestjs/common';
import { PreferenceCreateDto, PreferenceUpdateDto } from './dtos';
import { PrismaService } from '@prisma';

@Injectable()
export class PreferenceService {
  constructor(private prisma: PrismaService) {}

  async create(createPreferenceDto: PreferenceCreateDto) {
    const existingPreference = await this.prisma.preference.findFirst({
      where: { userId: createPreferenceDto.userId },
    });

    if (existingPreference) {
      return ({msg:'Preference for this user already exists'});
    }
    return this.prisma.preference.create({
      data: createPreferenceDto,
    });
  }

  async findAll() {
    return this.prisma.preference.findMany();
  }

  async findOne(id:string) {
    return this.prisma.preference.findFirst({
      where: { userId: id },
    });
  }

  async update(id: string, updatePreferenceDto: PreferenceUpdateDto) {
      const existingPreference = await this.prisma.preference.findUnique({
        where: {id},
      });
      if (!existingPreference) {throw new Error('Preference not found');}

      return await this.prisma.preference.update({
        where: {id},
        data: updatePreferenceDto,
      });
  }

  async remove(id:string) {
    return this.prisma.preference.delete({
      where: { id },
    });
  }
}
