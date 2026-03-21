import { Prisma } from '@prisma/client';

export type PrismaReaderProfile = Prisma.UserGetPayload<{
  select: {
    age: true;
    readings: {
      select: {
        rating: true;
        book: {
          select: {
            id: true;
            authorId: true;
            genres: {
              select: {
                literaryGenreId: true;
              };
            };
          };
        };
      };
    };
  };
}>;
