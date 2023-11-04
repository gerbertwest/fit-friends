import { UserRole } from '@fit-friends/shared/app-types';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class UseridInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    if (request.user.role === UserRole.Admin) {
      request.body['trainerId'] = request.user.sub;
    }
    else {
      request.body['userId'] = request.user.sub;
    }

    return next.handle();
  }
}
