import { Controller, HttpCode, HttpStatus, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ProfileService } from './profile.service'
import { ProfileCommand } from './enums'
import { ProfileCreateDto, ProfileUpdateDto, CreateProfileDto, UpdateProfileDto } from './dtos'
import type { ProfileRetrieveAllResponse } from './interfaces'

@Controller({
  path: '/profile',
  version: '1',
})
export class ProfileController {
  readonly #_service: ProfileService
  constructor(service: ProfileService) {
    this.#_service = service
  }
  @MessagePattern(ProfileCommand.PROFILE_CREATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async createProfile(@Payload() payload: ProfileCreateDto): Promise<null> {
    await this.#_service.createProfile(payload)
    return null
  }
  @MessagePattern(ProfileCommand.PROFILE_RETRIEVE)
  @HttpCode(HttpStatus.OK)
  async retrieveProfile(
    @Payload() payload: { userId: string },
  ): Promise<ProfileRetrieveAllResponse> {
    return await this.#_service.retrieveProfile(payload)
  }
  @MessagePattern(ProfileCommand.PROFILE_RETRIEVE_ALL)
  @HttpCode(HttpStatus.OK)
  async retrieveAllProfile(): Promise<ProfileRetrieveAllResponse[]> {
    return await this.#_service.retrieveAllProfile()
  }
  @MessagePattern(ProfileCommand.PROFILE_UPDATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProdile(@Payload() payload: ProfileUpdateDto): Promise<null> {
    await this.#_service.updateProfile(payload)
    return null
  }
  @MessagePattern(ProfileCommand.PROFILE_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProfile(@Payload() payload: { userId: string }): Promise<null> {
    await this.#_service.deleteProfile(payload)
    return null
  }

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.#_service.create(createProfileDto)
  }

  @Get()
  findAll() {
    return this.#_service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.#_service.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.#_service.update(id, updateProfileDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.#_service.remove(id)
  }

  @Put(':id/specialty/:specialtyId')
  setSpecialty(@Param('id') id: string, @Param('specialtyId') specialtyId: string) {
    return this.#_service.setSpecialty(id, specialtyId)
  }

  @Put(':id/interests')
  setInterests(@Param('id') id: string, @Body() interestIds: string[]) {
    return this.#_service.setInterests(id, interestIds)
  }

  @Post(':id/communities/:communityId')
  joinCommunity(@Param('id') id: string, @Param('communityId') communityId: string) {
    return this.#_service.joinCommunity(id, communityId)
  }

  @Delete(':id/communities/:communityId')
  leaveCommunity(@Param('id') id: string, @Param('communityId') communityId: string) {
    return this.#_service.leaveCommunity(id, communityId)
  }
}
