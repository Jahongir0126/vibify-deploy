import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpecialtyDto {
  @ApiProperty({
    description: 'Новое название специальности',
    example: 'Фронтенд-разработка',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Новое описание специальности',
    example: 'Разработка пользовательского интерфейса',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
} 