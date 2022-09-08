const { MONGO_DB = 'mongodb://localhost:27017/moviesdb', JWT_SECRET = 'secret_key' } = process.env;

const DOMAINS = {
  origin: [
    'https://olganum.nomorepartiesxyz.ru',
    'http://olganum.nomorepartiesxyz.ru',
    'http://localhost:3000',
  ],
  credentials: true,
};

const invalidLink = 'Невалидная ссылка';
const invalidId = 'Неверный id';

module.exports = {
  MONGO_DB,
  JWT_SECRET,
  DOMAINS,
  invalidLink,
  invalidId,
  created: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500,
  conflict: 409,
  forbidden: 403,
  unauthorized: 401,
  MONGO_DUPLICATE_ERROR_CODE: 11000,
};
