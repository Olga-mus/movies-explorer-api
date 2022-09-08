const { serverError } = require('../constants/constant');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = serverError;
  }
}

module.exports = InternalServerError;
