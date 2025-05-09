import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInterestDto {
  @ApiPropertyOptional({ 
    description: 'Название интереса',
    example: 'Node.js & TypeScript',
    required: false
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ 
    description: 'Описание интереса',
    example: 'JavaScript runtime environment with TypeScript support',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;
} 