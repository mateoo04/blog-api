const { Router } = require('express');

const { signUp, logIn } = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/sign-up', signUp);

authRouter.post('/log-in', logIn);

module.exports = authRouter;
