import { Genre } from 'src/entities/literary-genre';

export type UnreadBooks = {
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
  countActiveReadings: number;
};
