import { LiteraryGenre } from 'src/entities/literary-genre';

export abstract class LiteraryGenresRepository {
  abstract getAll(): Promise<LiteraryGenre[]>;
  abstract getIds(): Promise<string[]>;
}
