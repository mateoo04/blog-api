const { Router } = require('express');
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

commentsRouter.post('/', create);

commentsRouter.put('/:id', authorizeCommentEditing, update);

commentsRouter.delete('/:id', authorizeCommentEditing, deleteById);

module.exports = commentsRouter;
