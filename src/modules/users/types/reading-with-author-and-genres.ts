import { Genre } from 'src/entities/literary-genre';
import { ReadingStatus } from 'src/entities/reading';

export type ReadingWithAuthorAndGenres = {
  book: {
    id: string;
    title: string;
    author: {
      id: string;
      name: string;
    };
    literaryGenres: {
      id: string;
      name: Genre;
    }[];
  };
  rating?: number | null;
  status: ReadingStatus;
};
