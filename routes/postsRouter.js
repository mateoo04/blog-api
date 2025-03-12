const { Router } = require('express');
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

postsRouter.post('/', authorizeAdmin, create);

postsRouter.put('/:id', authorizeAdmin, update);

postsRouter.delete('/:id', authorizeAdmin, deleteById);

module.exports = postsRouter;
