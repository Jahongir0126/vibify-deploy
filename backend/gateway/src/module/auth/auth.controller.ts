import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Delete,
  Param,
  ParseUUIDPipe,
  Put,
  Get,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger'
import {
  SignInDto,
  SignInResponseDto,
  SignOutDto,
  SignUpDto,
  SignUpResponseDto,
} from './dtos'
import type {
  SignUpRequest,
  SignInRequest,
  SignOutRequest,
  RetrieveAllUsersResponse,
} from '@clients'
import { UserService } from '@clients'

@ApiTags('Auth')
@Controller({
  path: '/user-service',
  version: '1',
})
export class AuthController {
  readonly #_service: UserService

  constructor(service: UserService) {
    this.#_service = service
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({ type: SignUpResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signUp(@Body() body: SignUpRequest) {
    return this.#_service.signUp(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signIn(@Body() body: SignInRequest) {
    return this.#_service.signIn(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  @ApiBody({ type: SignOutDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  signOut(@Body() body: SignOutRequest) {
    return this.#_service.signOut(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  deleteAccount(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.deleteAccount({ id })
  }
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  restoreAccount(@Param('id', ParseUUIDPipe) id: string) {
    return this.#_service.restoreAccount({ id })
  }

  @HttpCode(HttpStatus.OK)
  @Get('users')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  retrieveAllUsers(): Promise<RetrieveAllUsersResponse[]> {
    return this.#_service.retrieveAllUsers()
  }
}
