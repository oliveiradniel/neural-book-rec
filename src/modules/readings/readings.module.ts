import { Module } from '@nestjs/common';

import { ReadingsService } from './readings.service';

@Module({
  providers: [ReadingsService],
  exports: [ReadingsService],
})
export class ReadingsModule {}
