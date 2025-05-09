import type { TcpOptions } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { App } from './app'
import { appConfig } from '@configs'
import { AllExceptionsFilter } from '@filters'

setImmediate(async (): Promise<void> => {
  const app = await NestFactory.createMicroservice<TcpOptions>(App, {
    transport: Transport.TCP,
    options: appConfig.options,
  })

  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen()
})