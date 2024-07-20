import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminService {
  private readonly adminEmail = 'admin@admin.com';
  private readonly adminPassword = '#@sdA!AA#$Z';

  validateAdmin(email: string, password: string): boolean {
    if (email === this.adminEmail && password === this.adminPassword) {
      return true;
    }
    throw new UnauthorizedException('Invalid admin credentials');
  }
}
