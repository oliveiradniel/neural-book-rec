import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';

import { ReadingsService } from './readings.service';

@Module({
  imports: [UsersModule],
  providers: [ReadingsService],
  exports: [ReadingsService],
})
export class ReadingsModule {}
