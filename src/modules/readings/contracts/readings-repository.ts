import type { Reading } from 'src/entities/reading';
import type { UpdateReadingData } from '../types/update-reading-data.type';

export abstract class ReadingsRepository {
  abstract getById(id: string): Promise<Reading | null>;
  abstract update(data: UpdateReadingData): Promise<Reading>;
}
