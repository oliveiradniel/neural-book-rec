import { UserMapper } from 'src/modules/users/mappers/user.mapper';

import type { LiteraryGenre as PrismaLiteraryGenre } from '@prisma/client';
import type { LiteraryGenre as DomainLiteraryGenre } from 'src/entities/literary-genre';

export class LiteraryGenreMapper {
  static toDomain(literaryGenre: PrismaLiteraryGenre): DomainLiteraryGenre {
    return {
      id: literaryGenre.id,
      name: UserMapper.toDomainGenre(literaryGenre.name),
    };
  }

  static toDomainList(
    literaryGenres: PrismaLiteraryGenre[],
  ): DomainLiteraryGenre[] {
    return literaryGenres.map((genre) => LiteraryGenreMapper.toDomain(genre));
  }
}
