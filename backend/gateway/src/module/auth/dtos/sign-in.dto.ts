import { ApiProperty } from '@nestjs/swagger'
import type { SignInRequest, SignInResponse } from '@clients'

export class SignInDto implements SignInRequest {
  @ApiProperty({
    example: 'Jahongir',
  })
  username: string

  @ApiProperty({
    example: 'A12345@a@3A_',
  })
  password: string
}

export class SignInResponseDto implements SignInResponse {
  @ApiProperty({
    example: 'Bearer token...',
  })
  accessToken: string

  @ApiProperty({
    example: 'token....',
  })
  refreshToken: string
}
