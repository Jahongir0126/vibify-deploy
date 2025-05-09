import { IsString, IsOptional } from 'class-validator';

export class UpdateInterestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
} 