import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/database/prisma.service';

import { ReadingMapper } from './mappers/reading.mapper';

import { ReadingsRepository } from './contracts/readings-repository';

import type { Reading } from 'src/entities/reading';
import type { UpdateReadingData } from './types/update-reading-data.type';

@Injectable()
export class PrismaReadingsRepository implements ReadingsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string): Promise<Reading | null> {
    const reading = await this.prismaService.reading.findUnique({
      where: {
        id,
      },
    });

    return reading ? ReadingMapper.toDomain(reading) : null;
  }

  async update({ id, ...data }: UpdateReadingData): Promise<Reading> {
    const updatedReading = await this.prismaService.reading.update({
      data,
      where: {
        id,
      },
    });

    return ReadingMapper.toDomain(updatedReading);
  }
}
