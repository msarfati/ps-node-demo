const pg = require('pg');

const pgConnectionString = {
  connectionString: 'postgresql://pluralsight:root@localhost:5432/ps-library'
};

const pgPool = new pg.Pool(pgConnectionString);

const queries = {
  // Book queries
  getBooks: 'SELECT * from book',
  getBookByID: 'SELECT * FROM book WHERE id = $1',

  // User queries
  checkUserExists: 'SELECT TRUE FROM appuser WHERE username = $1',
  insertUser: 'INSERT INTO appuser (username, password) VALUES ($1, $2)',
  getUser: 'SELECT * FROM appuser WHERE username = $1',
};

module.exports = {
  pgPool,
  queries,
};
