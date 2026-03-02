export enum ReadingStatus {
  READ = 'READ',
  WANT_TO_READ = 'WANT_TO_READ',
}

export type Reading = {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  status: ReadingStatus;
};
