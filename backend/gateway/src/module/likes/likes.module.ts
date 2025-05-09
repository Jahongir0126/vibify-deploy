import { Module } from '@nestjs/common'
import { LikesController } from './likes.controller'
import { LikeModule as LikesClientModule } from '@clients'
@Module({
    imports: [LikesClientModule],
    controllers: [LikesController],
})
export class LikesGatewayModule {} 