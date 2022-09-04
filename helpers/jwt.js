const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken

// const SECRET_KEY = 'secret_key';

// const { SECRET_KEY = 'secret_key' } = process.env;
const { JWT_SECRET } = require('../constants/constant');
// payload - это то, что хотим зашифровать
// eslint-disable-next-line arrow-body-style
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });// что хотим зашифровать и ключ
};

// eslint-disable-next-line arrow-body-style
const checkToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  checkToken,
};
