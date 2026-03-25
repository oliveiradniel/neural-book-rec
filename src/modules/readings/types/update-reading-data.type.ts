import { ReadingStatus } from 'src/entities/reading';

export type UpdateReadingData = {
  id: string;
  rating?: number;
  status?: ReadingStatus;
};
