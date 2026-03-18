import { Module } from '@nestjs/common';

import { LiteraryGenresService } from './literary-genres.service';

@Module({
  providers: [LiteraryGenresService],
  exports: [LiteraryGenresService],
})
export class LiteraryGenresModule {}
