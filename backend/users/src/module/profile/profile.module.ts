import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { PrismaService } from '@prisma'
import { ProfileController } from './profile.controller'

@Module({
  providers: [ProfileService, PrismaService],
  controllers: [ProfileController],
})
export class ProfileModule {}
