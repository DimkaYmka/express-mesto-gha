const userSchema = require('../models/user');

module.exports.getUsers = (req, res) => {
  userSchema.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  userSchema.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({ message: err.message })
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Данные введены некорректно.' });
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, about })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Пользователь с с данным id не существует.' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные.' });
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { avatar })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Пользователь с с данным id не существует.' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные.' });
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });
};



// const getUsers = (req, res) => {
//   res.status(200).send(users)
// }

// const getUser = (req, res) => {
//   const {id} = req.params;
//   const user = users.find((item) => item.id === Number(id));

//   if (user) {
//     return res.status(200).send(user)
//   }
//   return res.status(404).send({message: 'User not found'})
// }

// const createUser =(req, res) => {
//   id += 1;
//   const newUser = {
//     id,
//     ...req.body,
//   };

//   users.push(newUser);
//   res.status(201).send(newUser)
// }

// module.exports = { getUsers, getUser, createUser}