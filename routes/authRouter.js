const { Router } = require('express');

const { signUp, logIn } = require('../controllers/authController');
const { validateSignUp, validateLogIn } = require('../lib/validators');

const authRouter = Router();

authRouter.post('/sign-up', validateSignUp, signUp);

authRouter.post('/log-in', validateLogIn, (req, res, next) =>
  logIn(req, res, next, false)
);

authRouter.post('/admin/log-in', validateLogIn, (req, res, next) =>
  logIn(req, res, next, true)
);

module.exports = authRouter;
