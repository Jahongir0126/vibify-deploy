import { Transport } from '@nestjs/microservices'

declare interface AppConfig {
  transport: Transport
  options: {
    host: string
    port: number
  }
}

export const appConfig: AppConfig = {
  transport: Transport.TCP,
  options: {
    host: process.env.APP_HOST ?? '127.0.0.1',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 4003,
  },
}
