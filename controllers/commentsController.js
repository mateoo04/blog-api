const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAll(req, res, next) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: req.query?.postId || undefined,
      },
      include: {
        user: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return res.json({ comments });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        user: true,
      },
    });

    if (!comment) {
      return res.status(400).json({ message: 'No comment found' });
    }

    return res.json({ comment });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        postId: req.body.postId,
        userId: req.user.id,
      },
      include: {
        user: true,
      },
    });

    return res.status(201).json({ comment });
  } catch (err) {
    next(err);
  }
}

async function deleteById(req, res, next) {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: req.params.id,
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json({ message: 'Comment deleted', comment });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const comment = await prisma.comment.update({
      where: {
        id: req.params.id,
      },
      data: {
        content: req.body.content,
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json({ comment });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, deleteById, update };
