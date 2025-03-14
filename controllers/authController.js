const { issueJWT } = require('../lib/utils');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function signUp(req, res, next) {
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
