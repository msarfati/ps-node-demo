const debug = require('debug')('app:adminRoutes')
const express = require('express');
const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const samples = [
  {
    abra: 1,
    kadabra: 2,
  },
  {
    abra: 43,
    kadabra: 126,
  },
  {
    abra: 56765,
    kadabra: 23111,
  },
  {
    abra: 4336,
    kadabra: 23,
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug(client);

          const db = client.db(dbName);
          const response = await db.collection('mySamples').insertMany(samples);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
