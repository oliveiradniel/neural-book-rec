import { UserMapper } from 'src/modules/users/mappers/user.mapper';
import { BookWithAuthorAndGenre } from '../types/book-with-author-and-genre';
import { PrismaBookWithAuthorAndGenre } from '../types/prisma-book-with-author-and-genre';

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

    return {
      id: book.id,
      title: book.title,
      author: book.author.name,
      readerCount: book._count.readings,
      ratingAverage,
      literaryGenres: book.genres.map((genre) =>
        UserMapper.toDomainGenre(genre.literaryGenre.name),
      ),
    };
  }

  static toDomainList(
    books: PrismaBookWithAuthorAndGenre[],
  ): BookWithAuthorAndGenre[] {
    return books.map((book) => this.toDomain(book));
  }
}
