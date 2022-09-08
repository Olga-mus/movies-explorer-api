const { forbidden } = require('../constants/constant');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbidden;
  }
}

module.exports = Forbidden;
