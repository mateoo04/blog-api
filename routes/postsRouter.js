const { Router } = require('express');
const passport = require('../config/passport');
const {
  getAll,
  getById,
  create,
  deleteById,
  update,
} = require('../controllers/postsController');
const { authorizeAdmin } = require('../middleware/authMiddleware');

const postsRouter = Router();

postsRouter.get('/', getAll);
postsRouter.get('/:id', getById);

postsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeAdmin,
  create
);

postsRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorizeAdmin,
  update
);

postsRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorizeAdmin,
  deleteById
);

module.exports = postsRouter;
