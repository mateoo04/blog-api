const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const authRouter = Router();

authRouter.post('/sign-up', async (req, res, next) => {
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

    jwt.sign(
      { id: user.id },
      process.env.SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        res.json({
          token: 'Bearer ' + token,
        });
      }
    );
  } catch (err) {
    next(err);
  }
});

authRouter.post('/log-in', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).json('Invalid credentials');
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      jwt.sign(
        { id: user.id },
        process.env.SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          res.json({
            token: 'Bearer ' + token,
          });
        }
      );
    } else res.status(401).json('Invalid credentials');
  } catch (err) {
    next(err);
  }
});

module.exports = authRouter;
