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
            id: true;
            title: true;
            genres: {
              select: {
                literaryGenre: {
                  select: {
                    id: true;
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
