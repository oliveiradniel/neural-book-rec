import { Injectable } from '@nestjs/common';

import { BookMapper } from './mappers/book.mapper';

import { PrismaService } from 'src/infra/database/prisma.service';

import type { BooksRepository } from './contracts/books-repository';
import type { BookWithAuthorAndGenre } from './types/book-with-author-and-genre';
import type { Book } from 'src/entities/book';
import type { BookSummary } from './types/book-summary';

@Injectable()
export class PrismaBooksRepository implements BooksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<Book[]> {
    return this.prismaService.book.findMany();
  }

  async getBookSummary(): Promise<BookSummary[]> {
    const books = await this.prismaService.book.findMany({
      select: {
        id: true,
        title: true,
        authorId: true,
        genres: {
          select: {
            literaryGenreId: true,
          },
        },
      },
    });

    return BookMapper.toDomainBookSummaryList(books);
  }

  getUnreadBooksByUserId(userId: string): Promise<Book[]> {
    return this.prismaService.book.findMany({
      where: {
        readings: {
          none: { userId, status: 'READ' },
        },
      },
    });
  }

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
            id: true,
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
                id: true,
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
