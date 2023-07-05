const mongoose = require('mongoose');
const validator = require('validator');

const urlPattern = require('../middlewares/celebrate');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный Email',
    },
    // validate: {
    //   validator: (v) => validator.isEmail(v),
    //   message: 'Неверный Email',
    // },
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // validate: {
    //   validator: (url) => urlPattern.test(url),
    //   message: 'Неверный формат ссылки',
    // },
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};
module.exports = mongoose.model('user', userSchema);
