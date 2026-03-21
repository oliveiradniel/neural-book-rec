export type ReaderProfile = {
  age: number;
  readings: {
    book: {
      id: string;
      literaryGenreIds: string[];
      authorId: string;
      rating: number;
    };
  }[];
};
