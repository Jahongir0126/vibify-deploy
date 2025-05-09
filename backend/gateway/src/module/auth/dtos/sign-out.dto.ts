import { SignOutRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class SignOutDto implements SignOutRequest {
  @ApiProperty({
    example: 'token....',
  })
  refreshToken: string
}
