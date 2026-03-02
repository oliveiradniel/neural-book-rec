import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { NodeEnv } from './types/node-env';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  PORT!: number;

  @IsEnum(NodeEnv)
  @IsNotEmpty()
  @IsDefined()
  NODE_ENV!: NodeEnv;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB!: string;
}
