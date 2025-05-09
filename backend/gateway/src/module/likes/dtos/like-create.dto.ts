import {
    IsNotEmpty,
    IsUUID,
  } from 'class-validator';
import { LikeCreateRequest } from '../../../clients/likes/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class LikeCreateDto implements LikeCreateRequest {
  
    @ApiProperty({
        description: 'ID пользователя, который ставит лайк',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    likerId: string;
  
    @ApiProperty({
        description: 'ID пользователя, которому ставится лайк',
        example: '123e4567-e89b-12d3-a456-426614174001'
    })
    @IsUUID()
    @IsNotEmpty()
    likedId: string;
  }
  