const { Router } = require('express');

const authRouter = require('../routes/authRouter');
const postsRouter = require('../routes/postsRouter');
const commentsRouter = require('../routes/commentsRouter');

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.use('/posts', postsRouter);

indexRouter.use('/comments', commentsRouter);

module.exports = indexRouter;
