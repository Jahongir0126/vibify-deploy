import { Module } from '@nestjs/common'
import { UserModule } from '@clients'
import { AuthController } from './auth.controller'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class UserGatewayModule {}
