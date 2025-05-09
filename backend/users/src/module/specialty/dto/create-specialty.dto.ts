import { IsString, IsOptional } from 'class-validator';

export class CreateSpecialtyDto {
  @IsString()
  name: string;
 
  @IsString()
  @IsOptional()
  description?: string;
} 