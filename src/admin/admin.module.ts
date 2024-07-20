import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthGuard } from './auth.guard'; // Import AuthGuard

@Module({
  providers: [AdminService, AuthGuard],
  controllers: [AdminController],
})
export class AdminModule {}
