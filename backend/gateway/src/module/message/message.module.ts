import { Module } from '@nestjs/common'
import { MessageController } from './message.controller'
import { MessageModule as MessageClientModule } from '@clients'

@Module({
  imports: [MessageClientModule],
  controllers: [MessageController],
})
export class MessageGatewayModule {}
