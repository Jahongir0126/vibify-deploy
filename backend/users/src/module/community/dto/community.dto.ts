import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  specialtyId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestIds?: string[];
}

export class UpdateCommunityDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  specialtyId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestIds?: string[];
} 