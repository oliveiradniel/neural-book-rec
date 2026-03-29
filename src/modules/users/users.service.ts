import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaUsersRepository } from './users.repository';

import { UserWithReadings } from './types/user-with-readings';
import { User } from 'src/entities/user';
import { ReaderProfile } from './types/reader-profile';
import { OnlyUserNames } from './types/only-user-names';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  listAll(): Promise<User[]> {
    return this.usersRepository.getAll();
  }

  listOnlyNames(): Promise<OnlyUserNames[]> {
    return this.usersRepository.getOnlyNames();
  }

  async listWithReadings(id: string): Promise<UserWithReadings> {
    const user = await this.usersRepository.getWithReadings(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  listReaderProfiles(): Promise<ReaderProfile[]> {
    return this.usersRepository.getReaders();
  }

  listAllWithReadings(): Promise<UserWithReadings[]> {
    return this.usersRepository.getAllWithReadings();
  }

}
