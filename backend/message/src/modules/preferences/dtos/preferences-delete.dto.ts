import {
    IsUUID,
    IsNotEmpty,
  } from 'class-validator';
  import { PreferenceDeleteRequest } from '../interfaces';
  
  export class PreferenceDeleteDto implements PreferenceDeleteRequest {
    
    @IsUUID()
    @IsNotEmpty()
    userId: string;
  }
  