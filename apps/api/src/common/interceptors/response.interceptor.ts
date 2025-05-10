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
        const response: Record<string, unknown> = { success: true };

        if (message) response.message = message;

        if (data) {
          response.data = data;
        } else if (Object.keys(rest).length) {
          response.data = rest;
        }

        return response;
      }),
    );
  }
}
