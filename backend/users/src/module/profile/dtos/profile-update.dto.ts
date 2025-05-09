import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { ProfileUpdateRequest } from '../interfaces'

export class ProfileUpdateDto implements ProfileUpdateRequest {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bio: string

  @IsString()
  @IsNotEmpty()
  gender: string

  @IsString()
  @IsNotEmpty()
  photoUrl: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  location: string

  @IsString()
  @IsNotEmpty()
  birthdate: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  avatarUrl: string
}
