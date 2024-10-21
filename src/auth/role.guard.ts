import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomRequest } from 'src/auth/custom-request.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: CustomRequest = context.switchToHttp().getRequest();
    
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Not authorized');
    }

    if (!user.isAdmin) {
      throw new ForbiddenException('Authorized only for admin');
    }

    return true;
  }
}