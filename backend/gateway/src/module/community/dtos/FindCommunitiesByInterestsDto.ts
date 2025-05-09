import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsUUID } from 'class-validator'

export class FindCommunitiesByInterestsDto {
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
    description: 'Массив ID интересов',
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  interestIds: string[]
} 