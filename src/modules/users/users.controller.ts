import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

import { UserIdParamDTO } from './dtos/user-id.param.dto';

import type { UserWithReadings } from './types/user-with-readings';
import type { OnlyUserNames } from './types/only-user-names';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('only-names')
  listOnlyNames(): Promise<OnlyUserNames[]> {
    return this.usersService.listOnlyNames();
  }

  @Get(':userId')
  listWithReadings(@Param() param: UserIdParamDTO): Promise<UserWithReadings> {
    return this.usersService.listWithReadings(param.userId);
  }

  @Get()
  listAllWithReadings(): Promise<UserWithReadings[]> {
    return this.usersService.listAllWithReadings();
  }
}
