import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    IsInt,
    Min,
  } from 'class-validator';
  import { PreferenceCreateRequest } from '../interfaces';
  
  export class PreferenceCreateDto implements PreferenceCreateRequest {
    
    @IsUUID()
    @IsNotEmpty()
    userId: string;
  
    @IsString()
    @IsOptional()
    preferredGender?: string;
  
    @IsInt()
    @IsNotEmpty()
    @Min(18)
    ageMin: number;
  
    @IsInt()
    @IsNotEmpty()
    @Min(18)
    ageMax: number;
  
    @IsInt()
    @IsNotEmpty()
    locationRadius: number;
  }
  