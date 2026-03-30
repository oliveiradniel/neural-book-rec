import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { PrismaReadingsRepository } from './readings.repository';

import { ReadingStatus, type Reading } from 'src/entities/reading';
import type { UpdateReadingData } from './types/update-reading-data.type';
import type { CreateReadingData } from './types/create-reading-data.type';
import type { ReadingDetails } from './types/reading-details';

@Injectable()
export class ReadingsService {
  constructor(
    private readonly readingsRepository: PrismaReadingsRepository,
    private readonly usersService: UsersService,
  ) {}

  async findById({
    id,
    haveToExist,
  }: {
    id: string;
    haveToExist: boolean;
  }): Promise<Reading | null> {
    const reading = await this.readingsRepository.getById(id);

    if (haveToExist && !reading) {
      throw new NotFoundException('Reading not found.');
    }

    return reading;
  }

  async create(data: CreateReadingData): Promise<ReadingDetails> {
    const user = await this.usersService.findById(data.userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.readingsRepository.create({
      userId: data.userId,
      bookId: data.bookId,
      status: data.status,
      rating: data.rating,
    });
  }

  async update(data: UpdateReadingData): Promise<Reading> {
    const reading = await this.findById({ id: data.id, haveToExist: true });

    const noReview = data?.rating === null && reading?.rating === null;

    if (data.status === ReadingStatus.READ && noReview) {
      throw new ConflictException(
        `It's impossible to read book without evaluating it.`,
      );
    }

    const verifiedData = {
      status: data.status ?? reading?.status,
      rating:
        data.status === ReadingStatus.WANT_TO_READ
          ? 0
          : (data.rating ?? reading?.rating ?? 0),
    };

    return this.readingsRepository.update({ id: data.id, ...verifiedData });
  }
}
