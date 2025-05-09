import { IsString, IsOptional } from 'class-validator';

export class UpdateSpecialtyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
} 