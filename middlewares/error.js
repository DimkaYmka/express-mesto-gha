const errorHandler = (err, req, res, next) => {
  let error;
  if (err.statusCode === 404) {
    error = new UserNotFound(err);
  } else {
    error = new AbstractError(err);
  }
  res.status(err.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
