const cardsRouter = require('express').Router();

const {
  getCards, deleteCard, createCard, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCheckCard,
} = require('../middlewares/celebrate');

cardsRouter.get('/', getCards);

cardsRouter.delete('/:cardId', validationCheckCard, deleteCard);

cardsRouter.post('/', validationCreateCard, createCard);

cardsRouter.put('/:cardId/likes', validationCheckCard, addLikeCard);

cardsRouter.delete('/:cardId/likes', validationCheckCard, deleteLikeCard);

module.exports = cardsRouter;
