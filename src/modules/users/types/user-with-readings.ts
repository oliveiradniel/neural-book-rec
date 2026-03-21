import { ReadingWithAuthorAndGenres } from './reading-with-author-and-genres';

export type UserWithReadings = {
  id: string;
  name: string;
  age: number;
  bookCount: {
    read: number;
    wantToRead: number;
  };
  readings: ReadingWithAuthorAndGenres[];
};
