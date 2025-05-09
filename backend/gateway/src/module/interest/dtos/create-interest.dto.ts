import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInterestDto {
  @ApiProperty({ 
    description: 'Название интереса',
    example: 'Node.js',
    required: true
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({ 
    description: 'Описание интереса',
    example: 'JavaScript runtime environment',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;
} 