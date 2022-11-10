import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token = request.headers.authorization?.split?.(' ')[1];
      if (!token) new UnauthorizedException();

      const user = await this.authService.validateToken(token);
      if (!user) new UnauthorizedException();

      request.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
