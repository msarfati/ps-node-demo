-- psql ps-library --username=pluralsight --password
-- psql ps-library --username=pluralsight --password < schema.sql
DROP TABLE IF EXISTS "book";
CREATE TABLE IF NOT EXISTS "book" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "genre" VARCHAR(255),
    "author" VARCHAR(255)
);

INSERT INTO "book" ("title", "genre", "author") VALUES
    ('War and Peace','Historical Fiction','Lev Nikolayevich Tolstoy'),
    ('Les Misérables','Historical Fiction','Victor Hugo'),
    ('The Time Machine','Science Fiction','H. G. Wells'),
    ('A Journey into the Center of the Earth','Science Fiction','Jules Verne'),
    ('The Dark World','Fantasy','Henry Kuttner'),
    ('The Wind in the Willows','Fantasy','Kenneth Grahame'),
    ('Life On The Mississippi','History','Mark Twain'),
    ('Childhood','Biography','Lev Nikolayevich Tolstoy');

DROP TABLE IF EXISTS "appuser";
CREATE TABLE IF NOT EXISTS "appuser" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255),
    "password" VARCHAR(255)
);
