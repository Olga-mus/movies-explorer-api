// eslint-disable-next-line consistent-return
function centralHandlerErrors(err, req, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  res.status(500).send({ message: 'Что-то пошло не так' });
  next();
}

module.exports = {
  centralHandlerErrors,
};
