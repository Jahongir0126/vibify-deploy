import { IsString } from 'class-validator';

export class LeaveCommunityDto {
  @IsString()
  userId: string;
} 