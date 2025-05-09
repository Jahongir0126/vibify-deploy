import {
    IsNotEmpty,
    IsString,
    IsUUID,
  } from 'class-validator';
  import { MessageCreateRequest } from '../interfaces';
  
  export class MessageCreateDto implements MessageCreateRequest {
    
    @IsUUID()
    @IsNotEmpty()
    senderId: string;
  
    @IsUUID()
    @IsNotEmpty()
    receiverId: string;
  
    @IsString()
    @IsNotEmpty()
    content: string;
  }
  