import { Global, Module } from '@nestjs/common'
import { LikeService } from './like.service'

@Global()
@Module({
    providers: [LikeService],
    exports: [LikeService],
})
export class LikeModule {} 