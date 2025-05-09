import { Global, Module } from '@nestjs/common'
import { ProfileService } from './profile.service'

@Global()
@Module({
  exports: [ProfileService],
  providers: [ProfileService],
})
export class ProfileModule {}
