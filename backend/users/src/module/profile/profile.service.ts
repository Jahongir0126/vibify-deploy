import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@prisma'
import type {
  ProfileCreateRequest,
  ProfileDeleteRequest,
  ProfileRetrieveAllResponse,
  ProfileUpdateRequest,
} from './interfaces'
import { CreateProfileDto, UpdateProfileDto } from './dtos/profile.dto'

@Injectable()
export class ProfileService {
  readonly #_prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma
  }

  async #_findProfile(userId: string): Promise<void> {
    const profile = await this.#_prisma.userProfile.findFirst({
      where: {
        userId,
      },
    })
    if (!profile) {
      throw new NotFoundException('Profile not found')
    }
  }

  async #_findUser(id: string): Promise<void> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        id,
      },
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
  }

  async #_chekExistsUser(userId: string): Promise<null> {
    const userProfile = await this.#_prisma.userProfile.findFirst({
      where: {
        userId: userId,
      },
      select: {
        userId: true,
      },
    })

    if (userProfile) {
      throw new ConflictException('User already exists')
    }

    return null
  }

  async createProfile(payload: ProfileCreateRequest): Promise<null> {
    try {
      await this.#_chekExistsUser(payload.userId)
      await this.#_findUser(payload.userId)
      await this.#_prisma.userProfile.create({
        data: payload,
      })
      return null
    } catch (error) {
      throw new ConflictException(error.message)
    }
  }

  async updateProfile(payload: ProfileUpdateRequest): Promise<null> {
    await this.#_findProfile(payload.userId)
    await this.#_prisma.userProfile.update({
      where: {
        userId: payload.userId,
      },
      data: payload,
    })
    return null
  }

  async deleteProfile(payload: ProfileDeleteRequest) {
    await this.#_findProfile(payload.userId)
    await this.#_prisma.userProfile.delete({
      where: {
        userId: payload.userId,
      },
    })
  }

  async retrieveAllProfile(): Promise<ProfileRetrieveAllResponse[]> {
    return await this.#_prisma.userProfile.findMany({
      select: {
        userId: true,
        bio: true,
        gender: true,
        photoUrl: true,
        location: true,
        birthdate: true,
        avatarUrl: true,
        nickname: true,
        specialty: true,
        interests: true,
        communities: true,
      },
    })
  }

  async retrieveProfile(payload: {
    userId: string
  }): Promise<ProfileRetrieveAllResponse> {
    await this.#_findProfile(payload.userId)
    return await this.#_prisma.userProfile.findFirst({
      where: { userId: payload.userId },
      select: {
        userId: true,
        bio: true,
        gender: true,
        photoUrl: true,
        location: true,
        birthdate: true,
        avatarUrl: true,
        nickname: true,
        specialty: true,
        interests: true,
        communities: true,
      },
    })
  }

  async create(createProfileDto: CreateProfileDto) {
    const { specialtyId, interestIds, communityIds, ...data } = createProfileDto;
    return this.#_prisma.userProfile.create({
      data: {
        ...data,
        specialtyId,
        interests: {
          connect: interestIds?.map(id => ({ id })) || [],
        },
        communities: {
          connect: communityIds?.map(id => ({ id })) || [],
        },
      },
    });
  }

  async findAll() {
    return this.#_prisma.userProfile.findMany({
      include: {
        specialty: true,
        interests: true,
        communities: true,
      },
    });
  }

  async findOne(id: string) {
    return this.#_prisma.userProfile.findUnique({
      where: { userId: id },
      include: {
        specialty: true,
        interests: true,
        communities: true,
      },
    });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const { specialtyId, interestIds, communityIds, ...data } = updateProfileDto;
    return this.#_prisma.userProfile.update({
      where: { userId: id },
      data: {
        ...data,
        specialtyId,
        interests: {
          set: interestIds?.map(id => ({ id })) || [],
        },
        communities: {
          set: communityIds?.map(id => ({ id })) || [],
        },
      },
    });
  }

  async remove(id: string) {
    return this.#_prisma.userProfile.delete({
      where: { userId: id },
    });
  }

  async setSpecialty(userId: string, specialtyId: string) {
    return this.#_prisma.userProfile.update({
      where: { userId },
      data: {
        specialtyId,
      },
    });
  }

  async setInterests(userId: string, interestIds: string[]) {
    return this.#_prisma.userProfile.update({
      where: { userId },
      data: {
        interests: {
          set: interestIds.map(id => ({ id })),
        },
      },
    });
  }

  async joinCommunity(userId: string, communityId: string) {
    return this.#_prisma.userProfile.update({
      where: { userId },
      data: {
        communities: {
          connect: { id: communityId },
        },
      },
    });
  }

  async leaveCommunity(userId: string, communityId: string) {
    return this.#_prisma.userProfile.update({
      where: { userId },
      data: {
        communities: {
          disconnect: { id: communityId },
        },
      },
    });
  }
}
