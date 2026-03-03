import { Genre } from 'src/entities/literary-genre';

export type BookWithAuthorAndGenre = {
  id: string;
  title: string;
  author: string;
  readerCount: number;
  ratingAverage: number | null;
  literaryGenres: Genre[];
};
