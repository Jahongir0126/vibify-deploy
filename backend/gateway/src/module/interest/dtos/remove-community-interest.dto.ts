import { IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RemoveCommunityInterestDto {
  @ApiProperty({ 
    description: 'ID сообщества',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true
  })
  @IsUUID('4')
  communityId: string

  @ApiProperty({ 
    description: 'ID интереса',
    example: '987fcdeb-51a2-43f7-9f8d-9e8c7b6a5f4e',
    required: true
  })
  @IsUUID('4')
  interestId: string
} 