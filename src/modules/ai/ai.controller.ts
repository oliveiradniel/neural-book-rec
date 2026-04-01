import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { RecommenderService } from './services/recommender.service';

import { UserIdParamDTO } from '../users/dtos/user-id.param.dto';

import type { RecommendedReading } from './types/recommended-reading.type';

@Controller('ai')
export class AIController {
  constructor(private readonly recommenderService: RecommenderService) {}

  @Post('train')
  @HttpCode(HttpStatus.OK)
  train(): Promise<void> {
    return this.recommenderService.train();
  }

  @Get('recommendations/:userId')
  recommend(@Param() param: UserIdParamDTO): Promise<RecommendedReading[]> {
    return this.recommenderService.predict(param.userId);
  }
}
