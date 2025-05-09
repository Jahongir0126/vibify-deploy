import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialtyDto {
  @ApiProperty({
    description: 'Название специальности',
    example: 'Веб-разработка',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Описание специальности',
    example: 'Разработка веб-приложений и сайтов',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
} 