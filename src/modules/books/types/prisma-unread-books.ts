import { Prisma } from '@prisma/client';

export type PrismaUnreadBooks = Prisma.BookGetPayload<{
  select: {
    id: true;
    title: true;
    author: {
      select: {
        id: true;
        name: true;
      };
    };
    genres: {
      select: {
        literaryGenreId: true;
        literaryGenre: true;
      };
    };
    _count: {
      select: {
        readings: true;
      };
    };
  };
}>;
