import { BookWithAuthorAndGenre } from '../types/book-with-author-and-genre';

export abstract class BooksRepository {
  abstract getAllWithAuthorAndGenres(): Promise<BookWithAuthorAndGenre[]>;
}
