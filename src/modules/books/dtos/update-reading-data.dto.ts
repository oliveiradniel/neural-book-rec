import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { ReadingStatus } from 'src/entities/reading';

export class UpdateReadingDataDTO {
  @IsEnum(ReadingStatus)
  @IsOptional()
  status?: ReadingStatus;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @Max(5)
  rating?: number;
}
