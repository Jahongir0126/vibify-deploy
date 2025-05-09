import { Module } from '@nestjs/common'
import { ProfileModule } from '@clients'
import { ProfileController } from './profile.controller'

@Module({
  imports: [ProfileModule],
  controllers: [ProfileController],
})
export class ProfileGatewayModule {}
