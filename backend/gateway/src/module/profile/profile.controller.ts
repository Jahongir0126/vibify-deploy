import { ProfileRetrieveAllResponse, ProfileService } from '@clients'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ProfileCreateDto, ProfileUpdateDto } from './dtos'


@ApiTags('Profile')
@Controller({
  path: '/profile',
  version: '1',
})
export class ProfileController {
  readonly #_service: ProfileService

  constructor(service: ProfileService) {
    this.#_service = service
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  @ApiBody({ type: ProfileCreateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  createProduct(@Body() body: ProfileCreateDto): Promise<void> {
    return this.#_service.createProfile(body)
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  retrieveAllProducts(): Promise<ProfileRetrieveAllResponse> {
    return this.#_service.retrieveAllProfile()
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  retrieveOneProduct(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<ProfileRetrieveAllResponse> {
    return this.#_service.retrieveProfile({ userId })
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  @ApiBody({ type: ProfileUpdateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  updateProduct(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() body: ProfileUpdateDto,
  ): Promise<void> {
    return this.#_service.updateProfile({ userId, ...body })
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  deleteProduct(@Param('id', ParseUUIDPipe) userId: string): Promise<void> {
    return this.#_service.deleteProfile({ userId })
  }
}
