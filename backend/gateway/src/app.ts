import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { messageConfig, userConfig } from '@config'
import {
  ProfileGatewayModule,
  UserGatewayModule,
  MessageGatewayModule,
  LikesGatewayModule,
  PreferencesGatewayModule,
  CommunityGatewayModule,
  InterestGatewayModule,
  SpecialtyGatewayModule,
} from '@module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [userConfig, messageConfig],
      isGlobal: true,
    }),
    UserGatewayModule,
    ProfileGatewayModule,
    MessageGatewayModule,
    LikesGatewayModule,
    PreferencesGatewayModule,
    CommunityGatewayModule,
    InterestGatewayModule,
    SpecialtyGatewayModule,
  ],
})
export class App {}
