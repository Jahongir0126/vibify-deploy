import { Module } from '@nestjs/common'
import { CommunityController } from './community.controller'
import { CommunityClientModule } from '@clients'

@Module({
  imports: [CommunityClientModule],
  controllers: [CommunityController],
})
export class CommunityGatewayModule {} 