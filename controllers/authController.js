const { issueJWT } = require('../lib/utils');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

async function signUp(req, res, next) {
  const errors = validationResult(req)
    .array()
    .map((error) => ({ field: error.path, message: error.msg }));
  if (errors.length != 0) {
    return res.status(400).json(errors);
  }

  try {
    const userWithEnteredEmail = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (userWithEnteredEmail) {
      return res
        .status(409)
        .json({ message: 'User with that email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    const tokenObj = issueJWT(user);

    res.status(201).json(tokenObj);
  } catch (err) {
    next(err);
  }
}

async function logIn(req, res, next) {
  const errors = validationResult(req)
    .array()
    .map((error) => ({ field: error.path, message: error.msg }));
  if (errors.length != 0) {
    return res.status(400).json(errors);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(401).json('Invalid credentials');
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const tokenObj = issueJWT(user);

      res.json(tokenObj);
    } else res.status(401).json('Invalid credentials');
  } catch (err) {
    next(err);
  }
}

module.exports = { signUp, logIn };
