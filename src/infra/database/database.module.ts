import { Global, Module } from '@nestjs/common';

import { EnvModule } from 'src/config/env/env.module';

import { PrismaService } from './prisma.service';

import { PrismaUsersRepository } from 'src/modules/users/users.repository';
import { PrismaBooksRepository } from 'src/modules/books/books.repository';
import { PrismaAuthorsRepository } from 'src/modules/authors/authors.repository';
import { PrismaLiteraryGenresRepository } from 'src/modules/literaryGenres/literary-genres.repository';

@Global()
@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    PrismaUsersRepository,
    PrismaBooksRepository,
    PrismaAuthorsRepository,
    PrismaLiteraryGenresRepository,
  ],
  exports: [
    PrismaService,
    PrismaUsersRepository,
    PrismaBooksRepository,
    PrismaAuthorsRepository,
    PrismaLiteraryGenresRepository,
  ],
})
export class DatabaseModule {}
