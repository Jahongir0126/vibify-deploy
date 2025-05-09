import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './configs';
import { LikeModule, MessageModule, PreferenceModule } from '@module';
// import { PreferenceModule } from 'modules/preferences';

@Module({
  imports: [ConfigModule.forRoot({
    load: [dbConfig],
    isGlobal: true
  }),
  MessageModule,
  LikeModule,
  PreferenceModule,
  ],
})
export class App {}