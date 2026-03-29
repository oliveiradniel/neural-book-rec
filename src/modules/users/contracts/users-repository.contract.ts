import type { User } from 'src/entities/user';
import type { UserWithReadings } from '../types/user-with-readings';
import type { ReaderProfile } from '../types/reader-profile';
import type { OnlyUserNames } from '../types/only-user-names';

export abstract class UsersRepository {
  abstract getAll(): Promise<User[]>;
  abstract getOnlyNames(): Promise<OnlyUserNames[]>;
  abstract getWithReadings(id: string): Promise<UserWithReadings | null>;
  abstract getReaders(): Promise<ReaderProfile[]>;
  abstract getAllWithReadings(): Promise<UserWithReadings[]>;
}
