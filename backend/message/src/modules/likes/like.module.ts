import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
    imports: [PrismaModule],
    controllers: [LikeController],
    providers: [LikeService],
})
export class LikeModule { }
