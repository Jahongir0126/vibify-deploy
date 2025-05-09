import { Global, Module } from '@nestjs/common'
import { UserService } from './user.service'

@Global()
@Module({
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
