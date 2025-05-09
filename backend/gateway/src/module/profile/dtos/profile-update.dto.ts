import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ProfileUpdateRequest } from '@clients'
import { ApiProperty } from '@nestjs/swagger'

export class ProfileUpdateDto  {


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Student in TUIT',
  })
  bio: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'male',
  })
  gender: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://i.pravatar.cc/300?img=12',
  })
  photoUrl: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'Tashkent',
  })
  location: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-11-01',
  })
  birthdate: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/5e227329363657.55ef8df90a1ca.png',
  })
  avatarUrl: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: 'CoolUser123',
  })
  nickname: string
}
