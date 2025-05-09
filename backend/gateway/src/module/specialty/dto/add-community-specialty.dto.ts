import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommunitySpecialtyDto {
  @ApiProperty({
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  communityId: string;

  @ApiProperty({
    description: 'ID специальности',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsUUID()
  specialtyId: string;
} 