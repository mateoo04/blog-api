const { Router } = require('express');

const authRouter = require('../routes/authRouter');
const postsRouter = require('../routes/postsRouter');

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

indexRouter.use('/posts', postsRouter);

module.exports = indexRouter;
