/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
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

// module.exports.createUser = (req, res, next) => {
//   bcrypt.hash(String(req.body.password, 10))
//     .then((hashedPassword) => {
//       userSchema.create({
//         ...req.body, password: hashedPassword,
//       })
//         .then((user) => res.status(201).send(user))
//         .catch((err) => {
//           if (err.name === 'ValidationError') {
//             return res.status(errCodeInvalidData).send({ message: 'Данные введены некорректно.' });
//           // eslint-disable-next-line brace-style
//           }
//           // if (err.code === 11000) {
//           //   return next(new ConflictError(''));
//           // }
//           else {
//             res.status(errCodeDefault).send({ message: defaultErrorMessage });
//           }
//           return next(err);
//         });
//     })
//     .catch(next);
// };

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      userSchema.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res.send({ data: user });
        })
        .catch(next);
    })
    .catch(next);
};

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   userSchema.findOne({ email })
//     .select('+password')
//     .orFail(() => new Error('Пользователь с таким email не найден'))
//     .then((user) => {
//       console.log(user);
//       bcrypt.compare(String(password), user.password)
//         .then((isValidUser) => {
//           if (isValidUser) {
//             res.send({ data: user.toJSON() });
//           } else {
//             res.status(403).send({ message: 'Неправильный логин или пароль' });
//           }
//         });
//     })
//     .catch(next);
// };

module.exports.login = (req, res, next) => {
  // Вытащить email и password
  const { email, password } = req.body;

  // Проверить существует ли пользователь с таким email
  userSchema.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Пользователь не найден'))
    .then((user) => {
      // Проверить совпадает ли пароль
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            // создать JWT
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'JWT_SECRET');

            // прикрепить его к куке
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });

            // Если совпадает -- вернуть пользователя
            res.send({ data: user.toJSON() });
          } else {
            // Если не совпадает -- вернуть ошибку
            res.status(403).send({ message: 'Неправильный пароль' });
          }
        })
    })
    .catch(next);
};

// module.exports.getUserById = (req, res, next) => {
//   userSchema.findById(req.user._id)
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((err) => {
//       // if (err.name === 'DocumentNotFoundError') {
//       //   return next(new NotFoundError('Пользователь по указанному id не найден.'));
//       // }
//       return next(err);
//     });
// };


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
