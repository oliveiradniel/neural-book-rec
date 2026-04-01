import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthorsModule } from '../authors/authors.module';
import { BooksModule } from '../books/books.module';
import { LiteraryGenresModule } from '../literaryGenres/literary-genres.module';

import { RecommenderService } from './services/recommender.service';
import { ContextService } from './services/context.service';
import { FeatureEngineeringService } from './services/feature-engineering.service';
import { DatasetService } from './services/dataset.service';
import { ModelService } from './services/model.service';

import { AIController } from './ai.controller';

@Module({
  imports: [UsersModule, AuthorsModule, BooksModule, LiteraryGenresModule],
  providers: [
    RecommenderService,
    ContextService,
    FeatureEngineeringService,
    DatasetService,
    ModelService,
  ],
  controllers: [AIController],
})
export class AIModule {}
