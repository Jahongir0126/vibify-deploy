import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { dbConfig } from '@config'
import {
  AuthModule,
  ProfileModule,
  CommunityModule,
  InterestModule,
  SpecialtyModule,
} from '@module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    AuthModule,
    ProfileModule,
    CommunityModule,
    InterestModule,
    SpecialtyModule,
  ],
})
export class App {}
