import { Module } from '@nestjs/common';
import { InterestController } from './interest.controller';
import { InterestClientModule } from '@clients';
@Module({
  imports: [InterestClientModule],
  controllers: [InterestController],
})
export class InterestGatewayModule {} 
