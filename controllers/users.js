/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const userSchema = require('../models/user');
const {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  defaultErrorMessage,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  userSchema.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(errCodeDefault).send({ message: defaultErrorMessage }));
};

module.exports.getUser = (req, res) => {
  userSchema.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(errCodeNotFound).send({ message: defaultErrorMessage });
        return;
      }
      if (err.name === 'CastError') {
        res.status(errCodeInvalidData).send({ message: 'Пользователь с данным id не существует.' });
        return;
      }
      res.status(errCodeDefault).send({ message: defaultErrorMessage });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(errCodeInvalidData).send({ message: 'Данные введены некорректно.' });
      } else {
        res.status(errCodeDefault).send({ message: defaultErrorMessage });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(errCodeNotFound).send({ message: 'Пользователь с с данным id не существует.' });
      }
      if (err.name === 'ValidationError') {
        return res.status(errCodeInvalidData).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(errCodeDefault).send({ message: defaultErrorMessage });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(errCodeNotFound).send({ message: 'Пользователь с с данным id не существует.' });
      }
      if (err.name === 'ValidationError') {
        return res.status(errCodeInvalidData).send({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(errCodeDefault).send({ message: defaultErrorMessage });
      }
    });
};

// TODO
// const changeUserData = (id, newData, res, next) => {
//   userSchema.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((err) => {
//       if (err.name === 'DocumentNotFoundError') {
// eslint-disable-next-line max-len
//         return res.status(errCodeNotFound).send({ message: 'Пользователь с с данным id не существует.' });
//       }
//       return next(err);
//     });
// };

// module.exports.updateUser = (req, res, next) => {
//   const { name, about } = req.body;
//   return changeUserData(req.user._id, { name, about }, res, next);
// };

// module.exports.updateAvatar = (req, res, next) => {
//   const { avatar } = req.body;
//   return changeUserData(req.user._id, { avatar }, res, next);
// };
