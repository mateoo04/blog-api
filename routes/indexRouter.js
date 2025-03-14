const { Router } = require('express');

const passport = require('../config/passport');
const authRouter = require('../routes/authRouter');
const postsRouter = require('../routes/postsRouter');
const commentsRouter = require('../routes/commentsRouter');

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.use('/posts', postsRouter);

indexRouter.use(
  '/comments',
  passport.authenticate('jwt', { session: false }),
  commentsRouter
);

module.exports = indexRouter;
