import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from "@nestjs/common";
import { isEmpty } from "lodash";
import { Observable, tap } from "rxjs";

@Injectable()
export class NotFoundInterceptor
  implements NestInterceptor
{
  constructor(private errorMessage: string) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        if (!data || isEmpty(data)) {
          throw new NotFoundException(this.errorMessage);
        }
      }),
    );
  }
}
