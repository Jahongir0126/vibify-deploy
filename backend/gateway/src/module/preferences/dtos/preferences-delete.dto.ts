import {
    IsUUID,
    IsNotEmpty,
} from 'class-validator';
import { PreferenceDeleteRequest } from '@clients';
import { ApiProperty } from '@nestjs/swagger';

export class PreferenceDeleteDto implements PreferenceDeleteRequest {
    
    @ApiProperty({
        description: 'ID пользователя',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
  