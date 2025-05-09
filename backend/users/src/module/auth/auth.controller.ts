import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import { Command } from './enums'
import { SignInDto, SignOutDto, SignUpDto } from './dtos'
import type {
  RetrieveAllUsersResponse,
  SignInResponse,
  SignUpResponse,
} from './interfaces'
import { User } from '@prisma/client'

@Controller()
export class AuthController {
  readonly #_service: AuthService
  constructor(service: AuthService) {
    this.#_service = service
  }
  @MessagePattern(Command.AUTH_SIGN_UP)
  signUp(@Payload() payload: SignUpDto): Promise<SignUpResponse> {
    return this.#_service.signUp(payload)
  }
  @MessagePattern(Command.AUTH_SIGN_IN)
  signIn(@Payload() payload: SignInDto): Promise<SignInResponse> {
    return this.#_service.signIn(payload)
  }
  @MessagePattern(Command.AUTH_SIGN_OUT)
  signOut(@Payload() payload: SignOutDto): Promise<void> {
    return this.#_service.signOut(payload)
  }
  @MessagePattern(Command.AUTH_DELETE)
  delete(@Payload() payload: Pick<User, 'id'>): Promise<void> {
    return this.#_service.deleteAccount(payload)
  }
  @MessagePattern(Command.AUTH_RESTORE)
  restore(@Payload() payload: Pick<User, 'id'>): Promise<void> {
    return this.#_service.restoreAccount(payload)
  }
  @MessagePattern(Command.AUTH_RETRIEVE)
  retrieveAllUsers(): Promise<RetrieveAllUsersResponse[]> {
    return this.#_service.retrieveAllUsers()
  }
}
