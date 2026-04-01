import { ReaderProfile } from 'src/modules/users/types/reader-profile';
import { BookEmbedding } from './book-embedding.type';

export type BaseContext = {
  minAge: number;
  maxAge: number;
  literaryGenresIndex: Record<string, number>;
  authorsIndex: Record<string, number>;
  countLiteraryGenres: number;
  countAuthors: number;
  dimensions: number;
  averageBookAgesNormalized: Record<string, number>;
};

export type Context = BaseContext & {
  bookEmbeddings: BookEmbedding[];
  users: ReaderProfile[];
};
