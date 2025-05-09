import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateCommunityDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  rules?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestIds?: string[];
} 