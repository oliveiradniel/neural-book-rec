import { Injectable } from '@nestjs/common';

import { PrismaAuthorsRepository } from './authors.repository';
import { Author } from 'src/entities/author';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: PrismaAuthorsRepository) {}

  listAll(): Promise<Author[]> {
    return this.authorsRepository.getAll();
  }

  listIds(): Promise<string[]> {
    return this.authorsRepository.getIds();
  }
}
