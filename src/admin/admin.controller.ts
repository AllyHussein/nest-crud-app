import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express'; // Import Request type
import { AuthGuard } from './auth.guard'; // Import AuthGuard

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(AuthGuard)
  getAdminDashboard(@Req() request: Request) {
    const headers = request.headers;
    return { message: 'Welcome to the admin dashboard', headers };
  }
}
