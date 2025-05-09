import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  photoUrl: string;

  @IsString()
  gender: string;

  @IsString()
  birthdate: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  specialtyId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestIds?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  communityIds?: string[];
}

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  birthdate?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  specialtyId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestIds?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  communityIds?: string[];
} 