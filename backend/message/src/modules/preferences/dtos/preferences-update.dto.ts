import {
    IsOptional,
    IsString,
    IsUUID,
    IsInt,
    Min,
    IsNotEmpty,
} from 'class-validator';
import { PreferenceUpdateRequest } from '../interfaces';

export class PreferenceUpdateDto implements PreferenceUpdateRequest {

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsOptional()
    preferredGender?: string;

    @IsInt()
    @IsOptional()
    @Min(18)
    ageMin?: number;

    @IsInt()
    @IsOptional()
    @Min(18)
    ageMax?: number;

    @IsInt()
    @IsOptional()
    locationRadius?: number;
}
