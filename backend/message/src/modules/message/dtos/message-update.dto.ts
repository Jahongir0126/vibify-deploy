import {
    IsNotEmpty,
    IsString,
    IsUUID,
  } from 'class-validator';
  import { MessageUpdateRequest } from '../interfaces';
  
  export class MessageUpdateDto implements MessageUpdateRequest {
      
    @IsUUID()
    @IsNotEmpty()
    messageId: string;
  
    @IsString()
    @IsNotEmpty()
    content: string;
  }
  