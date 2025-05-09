import { registerAs } from '@nestjs/config'

declare interface DatabaseConfig {
  url: string
}

export const dbConfig = registerAs('db',
  (): DatabaseConfig => ({
    url: process.env.DATABASE_URL ?? undefined,
  }),
)
