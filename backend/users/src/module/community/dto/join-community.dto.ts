import { IsString } from 'class-validator';

export class JoinCommunityDto {
  @IsString()
  userId: string;
} 