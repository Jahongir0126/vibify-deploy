import { Global, Module } from '@nestjs/common'
import { CommunityService } from './community.service'

@Global()
@Module({
  exports: [CommunityService],
  providers: [CommunityService],
})
export class CommunityClientModule {} 