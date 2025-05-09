import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';

@Module({
  providers: [SpecialtyService],
  exports: [SpecialtyService],
})
export class SpecialtyClientModule {} 