import { Module } from '@nestjs/common';
import { PreferenceService } from './preferences.service';
import { PreferenceController } from './preferences.controller';
import { PrismaModule } from '@prisma';

@Module({
  imports: [PrismaModule],
  controllers: [PreferenceController],
  providers: [PreferenceService],
  exports: [PreferenceService],
})
export class PreferenceModule {}
