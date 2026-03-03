import { Global, Module } from '@nestjs/common';

import { EnvModule } from 'src/config/env/env.module';

import { PrismaService } from './prisma.service';

import { PrismaUsersRepository } from 'src/modules/users/users.repository';
import { PrismaBooksRepository } from 'src/modules/books/books.repository';

@Global()
@Module({
  imports: [EnvModule],
  providers: [PrismaService, PrismaUsersRepository, PrismaBooksRepository],
  exports: [PrismaService, PrismaUsersRepository, PrismaBooksRepository],
})
export class DatabaseModule {}
