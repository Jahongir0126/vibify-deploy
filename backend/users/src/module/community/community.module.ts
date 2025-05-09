import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { PrismaService } from '@prisma';

@Module({
  controllers: [CommunityController],
  providers: [CommunityService, PrismaService],
  exports: [CommunityService],
})
export class CommunityModule {} 