import { Injectable } from '@nestjs/common';

import { PrismaBooksRepository } from './books.repository';

import type { BookWithAuthorAndGenre } from './types/book-with-author-and-genre';
import type { Book } from 'src/entities/book';
import type { BookSummary } from './types/book-summary';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: PrismaBooksRepository) {}

  listAll(): Promise<Book[]> {
    return this.booksRepository.getAll();
  }

  listBookSummary(): Promise<BookSummary[]> {
    return this.booksRepository.getBookSummary();
  }

  listUnreadBooksByUserId(userId: string): Promise<Book[]> {
    return this.booksRepository.getUnreadBooksByUserId(userId);
  }

  listAllWithAuthorAndGenres(): Promise<BookWithAuthorAndGenre[]> {
    return this.booksRepository.getAllWithAuthorAndGenres();
  }
}
