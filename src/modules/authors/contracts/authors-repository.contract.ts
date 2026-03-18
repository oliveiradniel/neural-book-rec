import { Author } from 'src/entities/author';

export abstract class AuthorsRepository {
  abstract getAll(): Promise<Author[]>;
  abstract getIds(): Promise<string[]>;
}
