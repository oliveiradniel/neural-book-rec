import { Injectable } from '@nestjs/common';

import { UserMapper } from './mappers/user.mapper';

import { PrismaService } from 'src/infra/database/prisma.service';

import type { UsersRepository } from './contracts/users-repository.contract';
import type { UserWithReadings } from './types/user-with-readings';
import { User } from 'src/entities/user';
import { ReaderProfile } from './types/reader-profile';
import { OnlyUserNames } from './types/only-user-names';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getOnlyNames(): Promise<OnlyUserNames[]> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getWithReadings(userId: string): Promise<UserWithReadings | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        age: true,
        _count: {
          select: {
            readings: true,
          },
        },
        readings: {
          select: {
            id: true,
            book: {
              select: {
                id: true,
                title: true,
                genres: {
                  select: {
                    literaryGenre: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                author: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            rating: true,
            status: true,
          },
        },
      },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async getReaders(): Promise<ReaderProfile[]> {
    const users = await this.prismaService.user.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        age: true,
        readings: {
          select: {
            rating: true,
            book: {
              select: {
                id: true,
                authorId: true,
                genres: {
                  select: {
                    literaryGenreId: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        readings: {
          some: {
            status: 'READ',
          },
        },
      },
    });

    return UserMapper.toDomainReaderProfileList(users);
  }

  async getAllWithReadings(): Promise<UserWithReadings[]> {
    const users = await this.prismaService.user.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        age: true,
        _count: {
          select: {
            readings: true,
          },
        },
        readings: {
          select: {
            id: true,
            book: {
              select: {
                id: true,
                title: true,
                genres: {
                  select: {
                    literaryGenre: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                author: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            rating: true,
            status: true,
          },
        },
      },
    });

    return UserMapper.toDomainList(users);
  }

  
}
