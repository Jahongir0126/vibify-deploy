import {
  BadRequestException,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

export class VerifyAccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const accessToken = request.headers['authorization']?.replace('Bearer ', '')

    if (!accessToken) {
      throw new BadRequestException('Provice accsess token')
    }

    function parseJwt(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join(''),
      )
      return JSON.parse(jsonPayload)
    }

    return parseJwt(accessToken)
  }
}
