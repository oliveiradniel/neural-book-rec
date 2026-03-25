import { Reading as PrismaReading } from '@prisma/client';
import { Reading as DomainReading } from 'src/entities/reading';

import { UserMapper } from 'src/modules/users/mappers/user.mapper';

export class ReadingMapper {
  static toDomain(reading: PrismaReading): DomainReading {
    return {
      id: reading.id,
      userId: reading.userId,
      bookId: reading.bookId,
      status: UserMapper.toDomainReadingStatus(reading.status),
      rating: reading.rating,
    };
  }
}
