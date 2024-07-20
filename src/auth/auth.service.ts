import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly adminEmail = 'admin@admin.com';
  private readonly adminPassword = '#@sdA!AA#$Z';

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return user;
  }

  async login(email: string, password: string) {
    let token: string;
    if (email === this.adminEmail && password === this.adminPassword) {
      token = this.jwtService.sign({ userId: 0, isAdmin: true });
      return { token };
    } else {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        throw new UnauthorizedException('Invalid credentials');

      token = this.jwtService.sign({ userId: user.id });
    }

    return { token };
  }
}
