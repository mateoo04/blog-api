const jwt = require('jsonwebtoken');

function issueJWT(user) {
  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: '1d',
  });

  return {
    token: 'Bearer ' + token,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

module.exports = { issueJWT };
