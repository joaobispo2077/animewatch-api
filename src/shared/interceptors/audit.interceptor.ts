import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    const method = request.method;
    const url = request.url;
    // https://docs.nestjs.com/interceptors
    // https://stackoverflow.com/questions/62116938/save-audit-for-an-entity-using-nestjs-and-typeorm
    // TODO: ignore GET requests

    const now = Date.now();
    return next.handle().pipe(
      tap(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        console.log(`After... ${Date.now() - now}ms`);
        console.log(
          `Method: ${method} URL: ${url} Body: ${JSON.stringify(body)}`,
        );
      }),
    );
  }
}
