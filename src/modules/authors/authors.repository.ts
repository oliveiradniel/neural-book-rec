import { PrismaService } from 'src/infra/database/prisma.service';
import { AuthorsRepository } from './contracts/authors-repository.contract';
import { Injectable } from '@nestjs/common';
import { Author } from 'src/entities/author';

@Injectable()
export class PrismaAuthorsRepository implements AuthorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Author[]> {
    return this.prismaService.author.findMany();
  }

  async getIds(): Promise<string[]> {
    const authors = await this.prismaService.author.findMany({
      select: {
        id: true,
      },
    });

    return authors.map((author) => author.id);
  }
}
