const cardsRouter = require('express').Router();

const {
  getCards, deleteCard, createCard, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCheckCard,
} = require('../middlewares/celebrate');

cardsRouter.get('/', getCards);

cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.post('/', validationCreateCard, createCard);

cardsRouter.put('/:cardId/likes', addLikeCard);

cardsRouter.delete('/:cardId/likes', deleteLikeCard);

module.exports = cardsRouter;
