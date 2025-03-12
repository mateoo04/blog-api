const { Router } = require('express');
const passport = require('../config/passport');

const postsRouter = Router();

postsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    return res.json({ message: 'Hello, authenticated user!' });
  }
);

module.exports = postsRouter;
