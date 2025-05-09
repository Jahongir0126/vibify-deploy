import { ApiProperty } from '@nestjs/swagger'
import type { SignUpRequest, SignUpResponse } from '@clients'

export class SignUpDto implements SignUpRequest {
  @ApiProperty({
    example: 'Jahongir',
  })
  username: string

  @ApiProperty({
    example: 'A12345@a@3A_',
  })
  password: string
}

export class SignUpResponseDto implements SignUpResponse {
  @ApiProperty({
    example: 'Bearer token...',
  })
  accessToken: string

  @ApiProperty({
    example: 'token....',
  })
  refreshToken: string
}
