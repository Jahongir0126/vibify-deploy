import { OpenAPIObject } from '@nestjs/swagger'

export declare interface SwaggerOptions {
  path?: string
  options?: Omit<OpenAPIObject, 'paths'>
}

export const swaggerConfig: SwaggerOptions = {
  path: process.env.SWAGGER_PATH ?? '/docs',
  options: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0.1',
      description: 'Main Gateway',
      title: 'Gateway',
    },
  },
}
