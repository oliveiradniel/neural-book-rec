import * as tf from '@tensorflow/tfjs-node';

import { Injectable } from '@nestjs/common';

import { FeatureEngineeringService } from './feature-engineering.service';
import { UsersService } from 'src/modules/users/users.service';
import { AuthorsService } from 'src/modules/authors/authors.service';
import { BooksService } from 'src/modules/books/books.service';
import { LiteraryGenresService } from 'src/modules/literaryGenres/literary-genres.service';

import type { Context } from '../types/context/context.types';

@Injectable()
export class ContextService {
  constructor(
    private readonly featureEngineeringService: FeatureEngineeringService,
    private readonly usersService: UsersService,
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
    private readonly literaryGenresService: LiteraryGenresService,
  ) {}

  async create(): Promise<Context> {
    const users = await this.usersService.listReaderProfiles();
    const books = await this.booksService.listBookSummary();
    const authorIds = await this.authorsService.listIds();
    const literaryGenreIds = await this.literaryGenresService.listIds();

    const ages = users.map((user) => user.age);

    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    const authorsIndex = Object.fromEntries(
      authorIds.map((id, index) => [id, index]),
    );
    const literaryGenresIndex = Object.fromEntries(
      literaryGenreIds.map((literaryGenreId, index) => [
        literaryGenreId,
        index,
      ]),
    );

    const averageAgeReaders = (minAge + maxAge) / 2;
    const ageSumsPerBook: Record<string, number> = {};
    const ageCountsPerBook: Record<string, number> = {};

    const countLiteraryGenres = literaryGenreIds.length;
    const countAuthors = authorIds.length;

    users.forEach((reader) => {
      reader.readings.forEach((reading) => {
        ageSumsPerBook[reading.book.id] =
          (ageSumsPerBook[reading.book.id] || 0) + reader.age;
        ageCountsPerBook[reading.book.id] =
          (ageCountsPerBook[reading.book.id] || 0) + 1;
      });
    });

    const averageBookAgesNormalized = Object.fromEntries(
      books.map((book) => {
        const average = ageCountsPerBook[book.id]
          ? ageSumsPerBook[book.id] / ageCountsPerBook[book.id]
          : averageAgeReaders;

        return [
          book.id,
          this.featureEngineeringService.normalizeNumber({
            value: average,
            min: minAge,
            max: maxAge,
          }),
        ];
      }),
    );

    const baseContext = {
      minAge,
      maxAge,
      literaryGenresIndex,
      authorsIndex,
      countLiteraryGenres,
      countAuthors,
      dimensions: 1 + countLiteraryGenres + countAuthors,
      averageBookAgesNormalized,
    };

    const bookEmbeddings = books.map((book) =>
      tf.tidy(() => ({
        id: book.id,
        title: book.title,
        author: book.author.name,
        literaryGenres: book.literaryGenres.map(
          (literaryGenre) => literaryGenre.name,
        ),
        countActiveReadings: book.countActiveReadings,
        embed: this.featureEngineeringService
          .embedBook({
            book: {
              id: book.id,
              authorId: book.author.id,
              literaryGenreIds: book.literaryGenres.map(
                (literaryGenre) => literaryGenre.id,
              ),
            },
            context: baseContext,
          })
          .dataSync(),
      })),
    );

    return { ...baseContext, bookEmbeddings, users };
  }
}
