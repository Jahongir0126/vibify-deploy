import { PrismaService } from '@prisma';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';


import { Module } from '@nestjs/common';

@Module({
    controllers: [MessageController],
    providers: [MessageService, PrismaService],
})
export class MessageModule { }
