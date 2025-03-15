const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAll(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      where: {
        isPublished: req.user.isAdmin ? undefined : true,
      },
    });

    return res.json({ posts });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        author: true,
      },
    });

    if (!post) {
      return res.status(400).json({ message: 'No post found' });
    }

    return res.json({ post });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { title, content, isPublished, imageUrl } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.id,
        isPublished,
        imageUrl,
      },
    });

    return res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
}

async function deleteById(req, res, next) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: 'Post deleted', post });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { title, content, isPublished } = req.body;

    const post = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: title ? title : undefined,
        content: content ? content : undefined,
        isPublished: isPublished ? isPublished : undefined,
      },
    });

    return res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, deleteById, update };
