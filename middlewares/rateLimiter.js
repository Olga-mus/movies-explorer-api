const rateLimiter = require('express-rate-limit');

const limit = rateLimiter({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 400, // можно совершить максимум 100 запросов с одного IP
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  limit,
};
