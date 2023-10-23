import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserError } from '../app.constant';
import { UserRole } from '@fit-friends/shared/app-types';

@Injectable()
export class CheckAdminRoleGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.user.role !== UserRole.Admin) {
      throw new NotFoundException(UserError.AdminRole);
    }

    return true;

  }
}
