const debug = require('debug')('app:bookRoutes');
const express = require('express');
const db = require('../../db');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const result = await db.pgPool.query(db.queries.getBooks);

        res.render(
          'bookListView',
          {
            nav,
            books: result.rows,
            title: 'Library'
          }
        );
      }());
    });


  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const result = await db.pgPool.query(db.queries.getBookByID, [id]);
        [req.result] = result.rows;
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'bookView',
        {
          nav,
          book: req.result,
          title: 'Library'
        }
      );
    });

  return bookRouter;
}

module.exports = router;
