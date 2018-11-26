const debug = require('debug')('app:authRoutes');
const express = require('express');
const passport = require('passport');
const db = require('../../db');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;

      (async function addUser() {
        try {
          let result = await db.pgPool.query(db.queries.checkUserExists, [username]);
          if (result.rowCount > 0) {
            const errMsg = `Cannot create user: username "${username}" already exists.`;
            debug(errMsg);
            res.send(errMsg);
          } else {
            await db.pgPool.query(db.queries.insertUser, [username, password]);
            result = await db.pgPool.query(db.queries.getUser, [username]);
            if (result.rowCount === 1) {
              const userObj = result.rows[0];
              debug(userObj);
              req.login({ userObj }, () => {
                res.redirect('/auth/profile');
              });
            }
          }
        } catch (err) {
          debug(err);
        }
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signIn', {
        nav,
        title: 'Sign In',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  authRouter.route('/logout')
    .get((req, res) => {
      debug(req.user);
      if (req.user) {
        req.logOut();
        res.redirect('/');
      } else {
        res.redirect('/');
      }
    });

  return authRouter;
}

module.exports = router;
