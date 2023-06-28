/* eslint-disable no-unused-vars */
const router = require('express').Router();
const {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  dafaultErrorMessage,
} = require('../utils/errors');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => res.status(errCodeNotFound).send({ message: 'Страницы не существует' }));

module.exports = router;
