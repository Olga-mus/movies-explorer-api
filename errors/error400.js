const { badRequest } = require('../constants/constant');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = badRequest;
  }
}

module.exports = BadRequest;
