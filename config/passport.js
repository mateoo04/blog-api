const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (user) return done(null, user);
      else return done(null, false);
    } catch (err) {
      return done(err, null);
    }
  })
);

const optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) next();
    req.user = user || null;
    next();
  })(req, res, next);
};

module.exports = { passport, optionalAuth };
