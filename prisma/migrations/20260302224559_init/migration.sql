-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('READ', 'WANT_TO_READ');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('FANTASY', 'SCIENCE_FICTION', 'ROMANCE', 'HORROR', 'THRILLER', 'MYSTERY', 'ADVENTURE', 'DRAMA', 'HISTORICAL_FICTION', 'DYSTOPIA', 'BIOGRAPHY', 'AUTOBIOGRAPHY', 'HISTORY', 'PHILOSOPHY', 'SELF_HELP', 'BUSINESS', 'SCIENCE', 'TECHNOLOGY', 'POETRY', 'CHILDREN');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "literary_genres" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" "Genre" NOT NULL,

    CONSTRAINT "literary_genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "author_id" UUID NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_literary_genres" (
    "book_id" UUID NOT NULL,
    "literary_genre_id" UUID NOT NULL,

    CONSTRAINT "book_literary_genres_pkey" PRIMARY KEY ("book_id","literary_genre_id")
);

-- CreateTable
CREATE TABLE "readings" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "book_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "status" "BookStatus" NOT NULL,

    CONSTRAINT "readings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "authors_name_key" ON "authors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "readings_user_id_book_id_key" ON "readings"("user_id", "book_id");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_literary_genres" ADD CONSTRAINT "book_literary_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_literary_genres" ADD CONSTRAINT "book_literary_genres_literary_genre_id_fkey" FOREIGN KEY ("literary_genre_id") REFERENCES "literary_genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
