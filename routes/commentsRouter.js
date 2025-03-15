const { Router } = require('express');
const passport = require('../config/passport');
const {
  getAll,
  getById,
  create,
  deleteById,
  update,
} = require('../controllers/commentsController');
const { authorizeCommentEditing } = require('../middleware/authMiddleware');

const commentsRouter = Router();

commentsRouter.get('/', getAll);
commentsRouter.get('/:id', getById);

commentsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  create
);

commentsRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorizeCommentEditing,
  update
);

commentsRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authorizeCommentEditing,
  deleteById
);

module.exports = commentsRouter;
