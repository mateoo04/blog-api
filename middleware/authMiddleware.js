const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function authorizeAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}

async function authorizeCommentEditing(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: req.params.id,
    },
    select: {
      userId: true,
    },
  });

  if (!req.user.isAdmin && req.user.id !== comment.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}

module.exports = { authorizeAdmin, authorizeCommentEditing };
