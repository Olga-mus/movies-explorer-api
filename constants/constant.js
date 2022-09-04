const regExpURL = /^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:%?#[\]@!$&='()*+,;]+#?$/i;

const { MONGO_DB, SECRET_KEY } = process.env;

const DOMAINS = {
  origin: [
    'https://olganum.nomorepartiesxyz.ru',
    'http://olganum.nomorepartiesxyz.ru',
    'http://localhost:3000',
  ],
  credentials: true,
};

module.exports = {
  regExpURL,
  MONGO_DB,
  SECRET_KEY,
  DOMAINS,
};
