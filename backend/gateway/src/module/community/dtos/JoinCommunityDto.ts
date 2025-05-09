import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class JoinCommunityDto {
  @ApiProperty({ 
    description: 'ID пользователя, который хочет присоединиться к сообществу',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true
  })
  @IsUUID('4')
  userId: string
}