import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { CommunityService } from './community.service'
import { CommunityCommand } from './enums/index'
import {
  CreateCommunityDto,
  UpdateCommunityDto,
  JoinCommunityDto,
  LeaveCommunityDto,
} from './dto'

@Controller()
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @MessagePattern(CommunityCommand.COMMUNITY_CREATE)
  async createCommunity(@Payload() payload: CreateCommunityDto) {
    return this.communityService.create(payload)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_RETRIEVE_ALL)
  async getCommunities() {
    return this.communityService.findAll()
  }

  @MessagePattern(CommunityCommand.COMMUNITY_RETRIEVE)
  async getCommunity(@Payload() payload: { id: string }) {
    return this.communityService.findOne(payload.id)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_UPDATE)
  async updateCommunity(@Payload() payload: UpdateCommunityDto & { id: string }) {
    const { id, ...data } = payload
    return this.communityService.update(id, data)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_DELETE)
  async deleteCommunity(@Payload() payload: { id: string }) {
    return this.communityService.remove(payload.id)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_JOIN)
  async joinCommunity(@Payload() payload: JoinCommunityDto & { communityId: string }) {
    const { communityId, userId } = payload
    return this.communityService.addMember(communityId, userId)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_LEAVE)
  async leaveCommunity(@Payload() payload: LeaveCommunityDto & { communityId: string }) {
    const { communityId, userId } = payload
    return this.communityService.removeMember(communityId, userId)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_GET_USER_COMMUNITIES)
  async getUserCommunities(@Payload() payload: { userId: string }) {
    return this.communityService.getUserCommunities(payload.userId)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_GET_USERS)
  async getCommunityUsers(@Payload() payload: { communityId: string }) {
    return this.communityService.getCommunityUsers(payload.communityId)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_FIND_BY_INTERESTS)
  async findCommunitiesByInterests(@Payload() payload: { interestIds: string[] }) {
    return this.communityService.findCommunitiesByInterests(payload.interestIds)
  }

  @MessagePattern(CommunityCommand.COMMUNITY_FIND_BY_SPECIALTY)
  async findCommunitiesBySpecialty(@Payload() payload: { specialtyId: string }) {
    return this.communityService.findCommunitiesBySpecialty(payload.specialtyId)
  }
} 