-- psql ps-library --username=pluralsight --password
-- psql ps-library --username=pluralsight --password < schema.sql
DROP TABLE IF EXISTS "book";
CREATE TABLE IF NOT EXISTS "book" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "genre" VARCHAR(255),
    "author" VARCHAR(255),
    "goodreads_id" SERIAL
);

INSERT INTO "book" ("title", "genre", "author", "goodreads_id") VALUES
    ('War and Peace','Historical Fiction','Lev Nikolayevich Tolstoy',656),
    ('Les Misérables','Historical Fiction','Victor Hugo',24280),
    ('The Time Machine','Science Fiction','H. G. Wells',2493),
    ('A Journey into the Center of the Earth','Science Fiction','Jules Verne',32829),
    ('The Dark World','Fantasy','Henry Kuttner',1881716),
    ('The Wind in the Willows','Fantasy','Kenneth Grahame',5659),
    ('Life On The Mississippi','History','Mark Twain',99152),
    ('Childhood','Biography','Lev Nikolayevich Tolstoy',2359878);

DROP TABLE IF EXISTS "appuser";
CREATE TABLE IF NOT EXISTS "appuser" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255),
    "password" VARCHAR(255)
);
