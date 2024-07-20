import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (!email || !password) {
      throw new UnauthorizedException('Missing admin credentials');
    }

    return this.adminService.validateAdmin(email, password);
  }
}
