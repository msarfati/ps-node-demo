const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const db = require('../../../db');

function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    }, (username, password, done) => {
      (async function validateLogin() {
        try {
          const result = await db.pgPool.query(db.queries.getUser, [username]);
          debug(result);
          if (result.rowCount === 1) {
            const user = result.rows[0];
            if (user.password === password) {
              done(null, user);
            } else {
              done('Could not authenticate user', false);
            }
          } else {
            done('Could not authenticate user', false);
          }
        } catch (err) {
          console.log(err);
        }
      }());
    }
  ));
}

module.exports = localStrategy;
