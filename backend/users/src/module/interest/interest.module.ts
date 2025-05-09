import { Module } from '@nestjs/common';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { PrismaService } from '@prisma';

@Module({
  controllers: [InterestController],
  providers: [InterestService, PrismaService],
  exports: [InterestService],
})
export class InterestModule {} 