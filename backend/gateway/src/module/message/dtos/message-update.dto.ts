import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import type { MessageUpdateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class MessageUpdateDto implements MessageUpdateRequest {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '5e26a221-3254-4875-a5bf-807e9a9b206d',
  })
  messageId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Updated message content',
  })
  content: string
}
