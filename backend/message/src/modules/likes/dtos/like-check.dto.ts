import {
    IsUUID,
    IsNotEmpty,
  } from 'class-validator';
  import { LikeCheckRequest } from '../interfaces';
  
  export class LikeCheckDto implements LikeCheckRequest {
  
    @IsUUID()
    @IsNotEmpty()
    likerId: string;
  
    @IsUUID()
    @IsNotEmpty()
    likedId: string;
  }
  