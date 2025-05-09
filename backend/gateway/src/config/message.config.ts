import { registerAs } from '@nestjs/config'

declare interface MessageServiceOptions {
  host: string
  port: number
  timeout: number
}

export const messageConfig = registerAs<MessageServiceOptions>(
  'message',
  (): MessageServiceOptions => ({
    host: process.env.MESSAGE_SERVICE_HOST,
    port: process.env.MESSAGE_SERVICE_PORT
      ? parseInt(process.env.MESSAGE_SERVICE_PORT, 10)
      : undefined,
    timeout: process.env.MESSAGE_SERVICE_TIMEOUT
      ? parseInt(process.env.MESSAGE_SERVICE_TIMEOUT, 10)
      : undefined,
  }),
)
