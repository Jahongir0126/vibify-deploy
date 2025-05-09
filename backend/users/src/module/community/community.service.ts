import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(createCommunityDto: CreateCommunityDto) {
    const { interestIds, ...data } = createCommunityDto;
    
    if (interestIds?.length) {
      const interests = await this.prisma.interest.findMany({
        where: { id: { in: interestIds } },
      });
      if (interests.length !== interestIds.length) {
        throw new NotFoundException('One or more interests not found');
      }
    }

    return this.prisma.community.create({
      data: {
        ...data,
        interests: {
          connect: interestIds?.map(id => ({ id })) || [],
        },
      },
    });
  }

  async findAll() {
    return this.prisma.community.findMany({
      include: {
        specialty: true,
        interests: true,
        members: true,
      },
    });
  }

  async findOne(id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id },
      include: {
        specialty: true,
        interests: true,
        members: true,
      },
    });
    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }
    return community;
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    const community = await this.prisma.community.findUnique({
      where: { id },
    });
    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    const { interestIds, ...data } = updateCommunityDto;
    
    if (interestIds?.length) {
      const interests = await this.prisma.interest.findMany({
        where: { id: { in: interestIds } },
      });
      if (interests.length !== interestIds.length) {
        throw new NotFoundException('One or more interests not found');
      }
    }

    return this.prisma.community.update({
      where: { id },
      data: {
        ...data,
        interests: {
          set: interestIds?.map(id => ({ id })) || [],
        },
      },
    });
  }

  async remove(id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id },
    });
    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }

    return this.prisma.community.delete({
      where: { id },
    });
  }

  async addMember(communityId: string, userId: string) {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!community) {
      throw new NotFoundException(`Community with id ${communityId} not found`);
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException(`User profile with id ${userId} not found`);
    }

    return this.prisma.community.update({
      where: { id: communityId },
      data: {
        members: {
          connect: { userId },
        },
      },
    });
  }

  async removeMember(communityId: string, userId: string) {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!community) {
      throw new NotFoundException(`Community with id ${communityId} not found`);
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException(`User profile with id ${userId} not found`);
    }

    return this.prisma.community.update({
      where: { id: communityId },
      data: {
        members: {
          disconnect: { userId },
        },
      },
    });
  }

  async getUserCommunities(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      include: {
        communities: {
          include: {
            specialty: true,
            interests: true,
            members: true,
          },
        },
      },
    });
    if (!profile) {
      throw new NotFoundException(`User profile with id ${userId} not found`);
    }
    return profile.communities;
  }

  async getCommunityUsers(communityId: string) {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
      include: {
        members: true,
      },
    });
    if (!community) {
      throw new NotFoundException(`Community with id ${communityId} not found`);
    }
    return community.members;
  }

  async findCommunitiesByInterests(interestIds: string[]) {
    return this.prisma.community.findMany({
      where: {
        interests: {
          some: {
            id: {
              in: interestIds,
            },
          },
        },
      },
      include: {
        specialty: true,
        interests: true,
        members: true,
      },
    });
  }

  async findCommunitiesBySpecialty(specialtyId: string) {
    return this.prisma.community.findMany({
      where: {
        specialtyId,
      },
      include: {
        specialty: true,
        interests: true,
        members: true,
      },
    });
  }
} 