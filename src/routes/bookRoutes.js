const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
  const {
    middleware, getIndex, getByID, renderByID
  } = bookController(nav);

  bookRouter.use(middleware);

  bookRouter.route('/')
    .get(getIndex);


  bookRouter.route('/:id')
    .all(getByID)
    .get(renderByID);

  return bookRouter;
}

module.exports = router;
