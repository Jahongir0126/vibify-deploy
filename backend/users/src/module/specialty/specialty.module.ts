import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { PrismaService } from '@prisma';

@Module({
  controllers: [SpecialtyController],
  providers: [SpecialtyService,PrismaService],
  exports: [SpecialtyService],
})
export class SpecialtyModule {} 