const cardsRouter = require('express').Router();

const {
  getCards, deleteCard, createCard, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');

const {
  validationCreateCard,
  validationCheckCard,
} = require('../middlewares/celebrate');

cardsRouter.get('/', getCards);

cardsRouter.delete('/:cardId', validationCreateCard, deleteCard);

cardsRouter.post('/', createCard);

cardsRouter.put('/:cardId/likes', validationCheckCard, addLikeCard);

cardsRouter.delete('/:cardId/likes', validationCheckCard, deleteLikeCard);

module.exports = cardsRouter;
