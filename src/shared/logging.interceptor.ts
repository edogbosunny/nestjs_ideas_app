import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    Logger.log('Before...');
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    Logger.log('Before...');

    return next
      .handle()
      .pipe(
        tap(() => Logger.log(` ${req.method} ${req.url} After... ${Date.now() - now}ms`, context.getClass().name)),
      );
  }
}
