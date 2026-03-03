import { Prisma } from '@prisma/client';

export type PrismaUserWithReadings = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    age: true;
    _count: {
      select: {
        readings: true;
      };
    };
    readings: {
      select: {
        id: true;
        book: {
          select: {
            title: true;
            genres: {
              select: {
                literaryGenre: {
                  select: {
                    name: true;
                  };
                };
              };
            };
            author: {
              select: {
                id: true;
                name: true;
              };
            };
          };
        };
        rating: true;
        status: true;
      };
    };
  };
}>;
