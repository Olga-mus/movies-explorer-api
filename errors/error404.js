const { notFound } = require('../constants/constant');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFound;
  }
}

module.exports = NotFound;
