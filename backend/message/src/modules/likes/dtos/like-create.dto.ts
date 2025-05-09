import {
    IsNotEmpty,
    IsUUID,
  } from 'class-validator';
  import { LikeCreateRequest } from '../interfaces';
  
  export class LikeCreateDto implements LikeCreateRequest {
  
    @IsUUID()
    @IsNotEmpty()
    likerId: string;
  
    @IsUUID()
    @IsNotEmpty()
    likedId: string;
  }
  