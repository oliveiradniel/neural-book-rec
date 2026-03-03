import { Prisma } from '@prisma/client';

export type PrismaBookWithAuthorAndGenre = Prisma.BookGetPayload<{
  select: {
    id: true;
    title: true;
    author: {
      select: {
        name: true;
      };
    };
    readings: {
      select: {
        rating: true;
      };
    };
    genres: {
      select: {
        literaryGenre: {
          select: {
            name: true;
          };
        };
      };
    };
    _count: {
      select: {
        readings: true;
      };
    };
  };
}>;
