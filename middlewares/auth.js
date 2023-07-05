const jwt = require('jsonwebtoken');
const AuthError = require('../errors/401');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    return next(new AuthError('Необходимо авторизоваться.'));
  }

  try {
    payload = jwt.verify(token, 'JWT_SECRET');
  } catch (err) {
    return next(new AuthError('Необходимо авторизоваться.'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
