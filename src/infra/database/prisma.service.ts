import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { EnvService } from 'src/config/env/env.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly envService: EnvService) {
    const connectionString = envService.databaseURL;

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }
}
