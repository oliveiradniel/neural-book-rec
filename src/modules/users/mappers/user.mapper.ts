import { Genre as DomainGenre } from 'src/entities/literary-genre';
import { ReadingStatus as DomainReadingStatus } from 'src/entities/reading';
import {
  Genre as PrismaGenre,
  ReadingStatus as PrismaReadingStatus,
} from '@prisma/client';

import type { UserWithReadings } from '../types/user-with-readings';
import type { PrismaUserWithReadings } from '../types/prisma-user-with-readings';

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
      const literaryGenres = reading.book.genres.map((genre) =>
        UserMapper.toDomainGenre(genre.literaryGenre.name),
      );

      const status = UserMapper.toDomainReadingStatus(reading.status);

      return {
        title: reading.book.title,
        author: reading.book.author.name,
        literaryGenres,
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

  static toDomainGenre(genre: PrismaGenre): DomainGenre {
    return genre as DomainGenre;
  }

  static toDomainReadingStatus(
    status: PrismaReadingStatus,
  ): DomainReadingStatus {
    return status as DomainReadingStatus;
  }
}
