const router = require('express').Router();

const usersRouter = require('./users');

router.use('/users', usersRouter);
// router.use(usersRouter);
module.exports = router;
