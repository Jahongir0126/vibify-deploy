import {
    IsUUID,
    IsNotEmpty,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LikeDeleteRequest } from '../../../clients/likes/interfaces';

export class LikeDeleteDto implements LikeDeleteRequest {
    
    @ApiProperty({
        description: 'ID лайка для удаления',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    likeId: string;
}
  