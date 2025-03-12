const { Router } = require('express');

const passport = require('../config/passport');
const authRouter = require('../routes/authRouter');
const postsRouter = require('../routes/postsRouter');

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.use(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  postsRouter
);

module.exports = indexRouter;
