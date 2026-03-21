import type { User } from 'src/entities/user';
import type { UserWithReadings } from '../types/user-with-readings';
import type { ReaderProfile } from '../types/reader-profile';

export abstract class UsersRepository {
  abstract getAll(): Promise<User[]>;
  abstract getReaders(): Promise<ReaderProfile[]>;
  abstract getAllWithReadings(): Promise<UserWithReadings[]>;
}
