const router = require('express').Router();


const usersRouter = require('./users');
const cardsRouter = require('./cards');
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
// router.use(usersRouter);
module.exports = router;

