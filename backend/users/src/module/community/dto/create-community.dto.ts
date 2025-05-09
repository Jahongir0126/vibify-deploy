import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interestIds?: string[];
}