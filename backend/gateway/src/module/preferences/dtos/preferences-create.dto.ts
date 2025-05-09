import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    IsInt,
    Min,
} from 'class-validator';
import { PreferenceCreateRequest } from '@clients';
import { ApiProperty } from '@nestjs/swagger';

export class PreferenceCreateDto implements PreferenceCreateRequest {
    
    @ApiProperty({
        description: 'ID пользователя',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
  
    @ApiProperty({
        description: 'Предпочитаемый пол',
        example: 'female',
        required: false
    })
    @IsString()
    @IsOptional()
    preferredGender?: string;
  
    @ApiProperty({
        description: 'Минимальный возраст',
        example: 18,
        minimum: 18
    })
    @IsInt()
    @IsNotEmpty()
    @Min(18)
    ageMin: number;
  
    @ApiProperty({
        description: 'Максимальный возраст',
        example: 35,
        minimum: 18
    })
    @IsInt()
    @IsNotEmpty()
    @Min(18)
    ageMax: number;
  
    @ApiProperty({
        description: 'Радиус поиска в километрах',
        example: 50
    })
    @IsInt()
    @IsNotEmpty()
    locationRadius: number;
}
  