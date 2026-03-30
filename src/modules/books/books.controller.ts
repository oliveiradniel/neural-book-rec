import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { BooksService } from './books.service';
import { ReadingsService } from '../readings/readings.service';

import { ReadingIdParamDTO } from './dtos/reading-id.param.dto';
import { UserIdParamDTO } from '../users/dtos/user-id.param.dto';
import { UpdateReadingDataDTO } from './dtos/update-reading-data.dto';
import { CreateReadingParamDTO } from './dtos/create-reading.param.dto';
import { CreateReadingDataDTO } from './dtos/create-reading-data.dto';

import type { Reading } from 'src/entities/reading';
import type { BookWithAuthorAndGenre } from './types/book-with-author-and-genre';
import type { UnreadBook } from './types/unread-book';
import type { ReadingDetails } from '../readings/types/reading-details';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly readingsService: ReadingsService,
  ) {}

  @Get()
  listAllWithAuthorAndGenres(): Promise<BookWithAuthorAndGenre[]> {
    return this.booksService.listAllWithAuthorAndGenres();
  }

  @Get('unread/:userId')
  findUnreadBooksByUserId(
    @Param() param: UserIdParamDTO,
  ): Promise<UnreadBook[]> {
    return this.booksService.listUnreadBooksByUserId(param.userId);
  }

  @Post(':bookId/readings')
  createReading(
    @Param() param: CreateReadingParamDTO,
    @Body() body: CreateReadingDataDTO,
  ): Promise<ReadingDetails> {
    return this.readingsService.create({
      userId: body.userId,
      bookId: param.bookId,
      status: body.status,
      rating: body.rating,
    });
  }

  @Patch('readings/:readingId')
  updateReading(
    @Param() param: ReadingIdParamDTO,
    @Body() data: UpdateReadingDataDTO,
  ): Promise<Reading> {
    return this.readingsService.update({
      id: param.readingId,
      status: data.status,
      rating: data.rating,
    });
  }
}
