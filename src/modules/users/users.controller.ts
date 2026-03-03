import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

import type { User } from 'src/entities/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  listAll(): Promise<User[]> {
    return this.usersService.listAll();
  }
}
