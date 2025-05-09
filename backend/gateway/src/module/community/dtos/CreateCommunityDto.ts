import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCommunityDto {
    
    @IsString()
    @ApiProperty({ 
        description: 'Название сообщества',
        example: 'Node.js Developers',
        required: true
      })
    name: string
  
    @ApiPropertyOptional({ 
      description: 'Описание сообщества',
      example: 'Сообщество для разработчиков на Node.js. Обсуждаем лучшие практики, делимся опытом и помогаем друг другу.',
      required: false
    })
    @IsString()
    @IsOptional()
    description?: string
  
    @ApiPropertyOptional({ 
      description: 'Массив ID интересов',
      example: ['123e4567-e89b-12d3-a456-426614174000', '987fcdeb-51a2-43f7-9f8d-9e8c7b6a5f4e'],
      required: false,
      type: [String],
      isArray: true
    })
    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    interestIds?: string[]
  }