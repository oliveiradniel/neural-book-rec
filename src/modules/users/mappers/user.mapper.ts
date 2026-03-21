import { Genre as DomainGenre } from 'src/entities/literary-genre';
import {
  ReadingStatus as DomainReadingStatus,
  ReadingStatus,
} from 'src/entities/reading';
import {
  Genre as PrismaGenre,
  ReadingStatus as PrismaReadingStatus,
} from '@prisma/client';

import type { UserWithReadings } from '../types/user-with-readings';
import type { PrismaUserWithReadings } from '../types/prisma-user-with-readings';
import type { PrismaReaderProfile } from '../types/prisma-reader-profile';
import type { ReaderProfile } from '../types/reader-profile';

export class UserMapper {
  static toDomain(user: PrismaUserWithReadings): UserWithReadings {
    const bookCount = {
      read: user.readings.filter(
        (reading) =>
          UserMapper.toDomainReadingStatus(reading.status) ===
          DomainReadingStatus.READ,
      ).length,
      wantToRead: user.readings.filter(
        (reading) =>
          UserMapper.toDomainReadingStatus(reading.status) ===
          DomainReadingStatus.WANT_TO_READ,
      ).length,
    };

    const readings = user.readings.map((reading) => {
      const literaryGenres = reading.book.genres.map((genre) => ({
        id: genre.literaryGenre.id,
        name: UserMapper.toDomainGenre(genre.literaryGenre.name),
      }));

      const status = UserMapper.toDomainReadingStatus(reading.status);

      return {
        book: {
          id: reading.book.id,
          title: reading.book.title,
          author: {
            id: reading.book.author.id,
            name: reading.book.author.name,
          },
          literaryGenres,
        },
        rating: reading.rating,
        status,
      };
    });

    return {
      id: user.id,
      name: user.name,
      age: user.age,
      bookCount,
      readings,
    };
  }

  static toDomainList(users: PrismaUserWithReadings[]): UserWithReadings[] {
    return users.map((user) => UserMapper.toDomain(user));
  }

  static toDomainReaderProfile(user: PrismaReaderProfile): ReaderProfile {
    const readings = user.readings.map((reading) => {
      return {
        book: {
          id: reading.book.id,
          authorId: reading.book.authorId,
          rating: reading.rating as number,
          literaryGenreIds: reading.book.genres.map(
            (genre) => genre.literaryGenreId,
          ),
        },
      };
    });

    return {
      age: user.age,
      readings,
    };
  }

  static toDomainReaderProfileList(
    users: PrismaReaderProfile[],
  ): ReaderProfile[] {
    return users.map((user) => UserMapper.toDomainReaderProfile(user));
  }

  static toDomainGenre(genre: PrismaGenre): DomainGenre {
    return genre as DomainGenre;
  }

  static toDomainReadingStatus(
    status: PrismaReadingStatus,
  ): DomainReadingStatus {
    return status as DomainReadingStatus;
  }
}
