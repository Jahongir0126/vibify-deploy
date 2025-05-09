import { IsString, IsNotEmpty } from 'class-validator'
import type { SignInRequest } from '../interfaces'

export class SignInDto implements SignInRequest {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}
