import { Module } from '@nestjs/common'
import { PreferencesController } from './preferences.controller'
import { PreferenceModule as PreferencesClientModule } from '@clients'

@Module({
    imports: [PreferencesClientModule],
    controllers: [PreferencesController],
})
export class PreferencesGatewayModule {} 