import { registerAs } from '@nestjs/config'

declare interface DatabaseConfigOptions {
  url: string
}
export const dbConfig = registerAs<DatabaseConfigOptions>(
  'db',
  (): DatabaseConfigOptions => ({
    url: process.env.DATABASE_URL ?? undefined,
  }),
)
