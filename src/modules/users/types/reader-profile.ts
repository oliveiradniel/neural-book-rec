export type ReaderProfile = {
  age: number;
  readings: {
    rating: number;
    book: {
      id: string;
      literaryGenreIds: string[];
      authorId: string;
    };
  }[];
};
