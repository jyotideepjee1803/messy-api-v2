import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CustomRequest } from './custom-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Not authorized, no token');
    }

    try {
      const decoded: any = await this.authService.validateToken(token);
      // const user = await this.userModel.findById(decoded.id).select('-password');
      // if (!user) {
      //   throw new UnauthorizedException('User not found');
      // }
      // request['user'] = user;
      request.user = {id : decoded._id, email : decoded.email, isAdmin : decoded.isAdmin};
      return true;
    } catch (error) {
      throw new UnauthorizedException('Not authorized, token failed');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}
