import type { Book } from 'src/entities/book';
import type { BookWithAuthorAndGenre } from '../types/book-with-author-and-genre';
import type { BookSummary } from '../types/book-summary';
import type { UnreadBooks } from '../types/unread-books';

export abstract class BooksRepository {
  abstract getAll(): Promise<Book[]>;
  abstract getBookSummary(): Promise<BookSummary[]>;
  abstract getUnreadBooksByUserId(userId: string): Promise<UnreadBooks[]>;
  abstract getAllWithAuthorAndGenres(): Promise<BookWithAuthorAndGenre[]>;
}
