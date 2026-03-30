import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { ReadingStatus } from 'src/entities/reading';

export class CreateReadingDataDTO {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(ReadingStatus)
  @IsOptional()
  status: ReadingStatus;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @Max(5)
  rating?: number;
}
