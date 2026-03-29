import { UserMapper } from 'src/modules/users/mappers/user.mapper';

import type { BookWithAuthorAndGenre } from '../types/book-with-author-and-genre';
import type { PrismaBookWithAuthorAndGenre } from '../types/prisma-book-with-author-and-genre';
import type { PrismaBookSummary } from '../types/prisma-book-summary';
import type { BookSummary } from '../types/book-summary';
import type { PrismaUnreadBooks } from '../types/prisma-unread-books';
import type { UnreadBooks } from '../types/unread-books';

export class BookMapper {
  static toDomain(book: PrismaBookWithAuthorAndGenre): BookWithAuthorAndGenre {
    const sumOfRatings = book.readings.reduce(
      (sum, reading) => sum + (reading.rating || 0),
      0,
    );

    const ratingCount = book.readings.filter(
      (reading) => reading.rating !== null,
    ).length;

    const ratingAverage =
      ratingCount > 0
        ? parseFloat((sumOfRatings / ratingCount).toFixed(2))
        : null;

    const literaryGenres = book.genres.map((genre) => ({
      id: genre.literaryGenre.id,
      name: UserMapper.toDomainGenre(genre.literaryGenre.name),
    }));

    return {
      id: book.id,
      title: book.title,
      author: {
        id: book.author.id,
        name: book.author.name,
      },
      readerCount: book._count.readings,
      ratingAverage,
      literaryGenres,
    };
  }

  static toDomainList(
    books: PrismaBookWithAuthorAndGenre[],
  ): BookWithAuthorAndGenre[] {
    return books.map((book) => this.toDomain(book));
  }

  static toDomainBookSummary(book: PrismaBookSummary): BookSummary {
    const literaryGenreIds = book.genres.map((genre) => genre.literaryGenreId);

    return {
      id: book.id,
      title: book.title,
      authorId: book.authorId,
      literaryGenreIds,
    };
  }

  static toDomainBookSummaryList(books: PrismaBookSummary[]): BookSummary[] {
    return books.map((book) => BookMapper.toDomainBookSummary(book));
  }

  static toDomainUnreadBook(book: PrismaUnreadBooks): UnreadBooks {
    const literaryGenres = book.genres.map((genre) => ({
      id: genre.literaryGenre.id,
      name: UserMapper.toDomainGenre(genre.literaryGenre.name),
    }));

    return {
      id: book.id,
      title: book.title,
      author: {
        id: book.author.id,
        name: book.author.name,
      },
      literaryGenres,
      countActiveReadings: book._count.readings,
    };
  }

  static toDomainUnreadBookList(books: PrismaUnreadBooks[]): UnreadBooks[] {
    return books.map((book) => BookMapper.toDomainUnreadBook(book));
  }
}
