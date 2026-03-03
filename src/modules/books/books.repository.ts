import { Injectable } from '@nestjs/common';

import { BookMapper } from './mappers/book.mapper';

import { PrismaService } from 'src/infra/database/prisma.service';

import type { BooksRepository } from './contracts/books-repository';
import type { BookWithAuthorAndGenre } from './types/book-with-author-and-genre';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllWithAuthorAndGenres(): Promise<BookWithAuthorAndGenre[]> {
    const books = await this.prismaService.book.findMany({
      orderBy: {
        title: 'asc',
      },
      select: {
        id: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
        readings: {
          select: {
            rating: true,
          },
        },
        genres: {
          select: {
            literaryGenre: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            readings: true,
          },
        },
      },
    });

    return BookMapper.toDomainList(books);
  }
}
