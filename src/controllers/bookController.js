const db = require('../../db');
// const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  function middleware(req, res, next) {
    // if (req.user) {
    //   next();
    // } else {
    //   res.redirect('/');
    // }
    next();
  }


  function getIndex(req, res) {
    (async function query() {
      const books = await db.pgPool.query(db.queries.getBooks);

      res.render(
        'bookListView',
        {
          nav,
          books: books.rows,
          title: 'Library'
        }
      );
    }());
  }

  function renderByID(req, res) {
    res.render(
      'bookView',
      {
        nav,
        book: req.book,
        title: 'Library'
      }
    );
  }

  function getByID(req, res, next) {
    (async function query() {
      const { id } = req.params;
      const result = await db.pgPool.query(db.queries.getBookByID, [id]);
      // [req.result] = result.rows;
      const book = result.rows[0];
      book.details = await bookService.getBookByID(book.goodreads_id);
      req.book = book;
      next();
    }());
  }

  return {
    middleware,
    getIndex,
    renderByID,
    getByID,
  };
}

module.exports = bookController;
