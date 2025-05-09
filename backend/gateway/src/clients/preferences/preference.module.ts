import { Global, Module } from '@nestjs/common'
import { PreferenceService } from './preference.service'

@Global()
@Module({
    providers: [PreferenceService],
    exports: [PreferenceService],
})
export class PreferenceModule {} 