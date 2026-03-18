import { Injectable } from '@nestjs/common';
import { LiteraryGenre } from 'src/entities/literary-genre';
import { PrismaLiteraryGenresRepository } from './literary-genres.repository';

@Injectable()
export class LiteraryGenresService {
  constructor(
    private readonly literaryGenresRepository: PrismaLiteraryGenresRepository,
  ) {}

  listAll(): Promise<LiteraryGenre[]> {
    return this.literaryGenresRepository.getAll();
  }

  listIds(): Promise<string[]> {
    return this.literaryGenresRepository.getIds();
  }
}
