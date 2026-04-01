import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './config/env/env.module';
import { DatabaseModule } from './infra/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AIModule } from './modules/ai/ai.module';

import { envValidate } from './config/env/env.validate';

import { EnvironmentVariablesDTO } from './config/env/env.dto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config) => envValidate(config, EnvironmentVariablesDTO),
    }),
    EnvModule,
    DatabaseModule,
    UsersModule,
    BooksModule,
    AIModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
