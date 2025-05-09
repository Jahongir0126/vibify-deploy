import {
    IsUUID,
    IsNotEmpty,
  } from 'class-validator';
  import { LikeDeleteRequest } from '../interfaces';
  
  export class LikeDeleteDto implements LikeDeleteRequest {
    
    @IsUUID()
    @IsNotEmpty()
    likeId: string;
  }
  