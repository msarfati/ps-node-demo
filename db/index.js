const pg = require('pg');

const pgConnectionString = {
  connectionString: 'postgresql://pluralsight:root@localhost:5432/ps-library'
};

const pgPool = new pg.Pool(pgConnectionString);

const queries = {
  getBooks: 'SELECT * from book',
  getBookByID: 'SELECT * FROM book WHERE id = $1',
};

module.exports = {
  pgPool,
  queries,
};
