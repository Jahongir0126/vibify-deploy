import { Module } from '@nestjs/common';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyClientModule } from '../../clients/specialty/specialty.module';

@Module({
  imports: [SpecialtyClientModule],
  controllers: [SpecialtyController],
})
export class SpecialtyGatewayModule {} 