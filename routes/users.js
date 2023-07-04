const usersRouter = require('express').Router();
const {
  getUsers, getUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateAvatar,
  validationUpdateUser,
} = require('../middlewares/celebrate');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', validationUserId, getUser);

usersRouter.get('/me', getUserById);

usersRouter.patch('/me', validationUpdateUser, updateUser);

usersRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = usersRouter;
