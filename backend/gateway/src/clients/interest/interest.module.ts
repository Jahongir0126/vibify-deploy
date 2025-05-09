import { Global, Module } from '@nestjs/common';
import { InterestService } from './interest.service';

@Global()
@Module({
  providers: [InterestService],
  exports: [InterestService],
})
export class InterestClientModule {} 