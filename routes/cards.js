const cardsRouter = require('express').Router();

const {
  getCards, deleteCard, createCard, addLikeCard, deleteLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.delete('/:cardId', deleteCard);

cardsRouter.post('/', createCard);

cardsRouter.put('/:cardId/likes', addLikeCard);

cardsRouter.delete('/:cardId/likes', deleteLikeCard);

module.exports = cardsRouter;
