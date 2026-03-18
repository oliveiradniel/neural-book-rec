import { LiteraryGenre } from 'src/entities/literary-genre';
import { PrismaService } from 'src/infra/database/prisma.service';
import { LiteraryGenresRepository } from './contracts/literary-genres-repository.contract';
import { LiteraryGenreMapper } from './mappers/literary-genre.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaLiteraryGenresRepository implements LiteraryGenresRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<LiteraryGenre[]> {
    const literaryGenres = await this.prismaService.literaryGenre.findMany();

    return LiteraryGenreMapper.toDomainList(literaryGenres);
  }

  async getIds(): Promise<string[]> {
    const literaryGenres = await this.prismaService.literaryGenre.findMany({
      select: {
        id: true,
      },
    });

    return literaryGenres.map((literaryGenre) => literaryGenre.id);
  }
}
