import { Injectable } from '@nestjs/common';

import { PrismaUsersRepository } from './users.repository';

import type { User } from 'src/entities/user';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  listAll(): Promise<User[]> {
    return this.usersRepository.getAll();
  }
}
