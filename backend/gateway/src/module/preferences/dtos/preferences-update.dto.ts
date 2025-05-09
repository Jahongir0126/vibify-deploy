import {
    IsOptional,
    IsString,
    IsUUID,
    IsInt,
    Min,
    IsNotEmpty,
} from 'class-validator';
import { PreferenceUpdateRequest } from '@clients';
import { ApiProperty } from '@nestjs/swagger';

export class PreferenceUpdateDto implements PreferenceUpdateRequest {

    @ApiProperty({
        description: 'Предпочитаемый пол',
        example: 'male',
        required: false
    })
    @IsString()
    @IsOptional()
    preferredGender?: string;

    @ApiProperty({
        description: 'Минимальный возраст',
        example: 25,
        minimum: 18,
        required: false
    })
    @IsInt()
    @IsOptional()
    @Min(18)
    ageMin?: number;

    @ApiProperty({
        description: 'Максимальный возраст',
        example: 40,
        minimum: 18,
        required: false
    })
    @IsInt()
    @IsOptional()
    @Min(18)
    ageMax?: number;

    @ApiProperty({
        description: 'Радиус поиска в километрах',
        example: 100,
        required: false
    })
    @IsInt()
    @IsOptional()
    locationRadius?: number;
}
