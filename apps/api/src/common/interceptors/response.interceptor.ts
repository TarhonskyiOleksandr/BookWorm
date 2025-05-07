/* eslint-disable prettier/prettier */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res) => {
        const { data, message, ...rest } = res ?? {};

        return {
          success: true,
          ...(message ? { message } : {}),
          ...(typeof data ? { data } : Object.keys(rest).length ? { data: res } : {}),
        };
      }),
    );
  }
}
