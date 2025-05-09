import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import type { MessageCreateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class MessageCreateDto implements MessageCreateRequest {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '3c26a221-3254-4875-a5bf-807e9a9b206d',
  })
  senderId: string

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '7d36b124-4254-4875-b2cf-807e9a9b206d',
  })
  receiverId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Hello, how are you?',
  })
  content: string
}
