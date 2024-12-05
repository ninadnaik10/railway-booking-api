import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const adminKey = request.headers['admin-key'];

    if (!adminKey) {
      throw new UnauthorizedException('Admin key is missing.');
    }

    if (adminKey !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('Invalid Admin key.');
    }

    return true;
  }
}
