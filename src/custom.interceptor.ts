import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('This is Intercepting the request');
    return handler.handle().pipe(
      map((data) => {
        console.log('This is Intercepting the response');
        return data;
      }),
    );
  }
}
