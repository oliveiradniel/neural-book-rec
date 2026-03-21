import { Injectable } from '@nestjs/common';

import { PrismaUsersRepository } from './users.repository';

import { UserWithReadings } from './types/user-with-readings';
import { User } from 'src/entities/user';
import { ReaderProfile } from './types/reader-profile';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  listAll(): Promise<User[]> {
    return this.usersRepository.getAll();
  }

  listReaderProfiles(): Promise<ReaderProfile[]> {
    return this.usersRepository.getReaders();
  }

  listAllWithReadings(): Promise<UserWithReadings[]> {
    return this.usersRepository.getAllWithReadings();
  }
}
