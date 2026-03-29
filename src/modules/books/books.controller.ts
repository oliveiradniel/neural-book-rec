import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { BooksService } from './books.service';
import { ReadingsService } from '../readings/readings.service';

import { ReadingIdParamDTO } from './dtos/reading-id.param.dto';
import { UserIdParamDTO } from '../users/dtos/user-id.param.dto';
import { UpdateReadingDataDTO } from './dtos/update-reading-data.dto';

import type { Reading } from 'src/entities/reading';
import type { BookWithAuthorAndGenre } from './types/book-with-author-and-genre';
import type { UnreadBooks } from './types/unread-books';

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
  ): Promise<UnreadBooks[]> {
    return this.booksService.listUnreadBooksByUserId(param.userId);
  }

  @Patch('readings/:readingId')
  updateReading(
    @Param() param: ReadingIdParamDTO,
    @Body() data: UpdateReadingDataDTO,
  ): Promise<Reading> {
    return this.readingsService.update({
      id: param.readingId,
      ...data,
    });
  }
}
