import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async createUser(@Body() body: { email: string; password: string }) {
    return this.prisma.user.create({ data: body });
  }

  @Get()
  async getUsers() {
    return this.prisma.user.findMany();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: { email?: string; password?: string },
  ) {
    return this.prisma.user.update({ where: { id: Number(id) }, data: body });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }
}
