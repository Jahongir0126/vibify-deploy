import { IsNotEmpty, IsJWT } from 'class-validator'
import type { SignOutRequest } from '../interfaces'

export class SignOutDto implements SignOutRequest {
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string
}
