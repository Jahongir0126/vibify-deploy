import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInterestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
} 