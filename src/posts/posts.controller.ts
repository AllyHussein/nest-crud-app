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

@Controller('posts')
export class PostController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async createPost(
    @Body() body: { title: string; content: string; userId: number },
  ) {
    return this.prisma.post.create({ data: body });
  }

  @Get()
  async getPosts() {
    return this.prisma.post.findMany();
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.prisma.post.findUnique({ where: { id: Number(id) } });
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() body: { title?: string; content?: string },
  ) {
    return this.prisma.post.update({ where: { id: Number(id) }, data: body });
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.prisma.post.delete({ where: { id: Number(id) } });
  }
}
