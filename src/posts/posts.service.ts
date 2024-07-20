import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async findOne(id: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updatePostDto: Prisma.PostUpdateInput,
  ): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
