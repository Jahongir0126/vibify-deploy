import { registerAs } from '@nestjs/config'

declare interface UserServiceOptions {
  host: string
  port: number
  timeout: number
}

export const userConfig = registerAs<UserServiceOptions>(
  'user',
  (): UserServiceOptions => ({
    host: process.env.USER_SERVICE_HOST,
    port: process.env.USER_SERVICE_PORT
      ? parseInt(process.env.USER_SERVICE_PORT, 10)
      : undefined,
    timeout: process.env.USER_SERVICE_TIMEOUT
      ? parseInt(process.env.USER_SERVICE_TIMEOUT, 10)
      : undefined,
  }),
)
