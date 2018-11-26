# ps-node-demo
Michael Sarfati

This is a sample application built from a tutorial on Pluralsight, with some modifications, intended for future reference.

Some features of this application:

- nodejs/express application layout
- Use of `async`, Promises
- ES6 idioms, AirBnB linter
- Renderer examples with ejs and pug

## Requirements
- nodejs
- postgresql

## Installation

1. Install
```bash
npm i
```

2. Create postgres user and database
```bash
psql -c "CREATE ROLE myUser PASSWORD 'aaa' NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN"
psql -c "CREATE DATABASE 'ps-library'"
```

3. Populate database
```bash
psql ps-library --username=pluralsight --password < schema.sql
```

## Goodreads API Service
This app just uses the key from the sample URL. Likely, this sample URL's key will be updated. You can retrieve the sample URL from https://www.goodreads.com/api/index#book.show