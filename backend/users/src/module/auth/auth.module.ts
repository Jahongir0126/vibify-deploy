import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PrismaService } from '@prisma'
import { AuthController } from './auth.controller'

@Module({
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
