const cardSchema = require('../models/card');
const {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  defaultErrorMessage,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  cardSchema.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(errCodeDefault).send({ message: defaultErrorMessage }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
console.log(cardId);
  cardSchema
    .findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(errCodeNotFound).send({ message: 'Карточка с данным id не существует.' });
      }
      if (err.name === 'CastError') {
        return res.status(errCodeInvalidData).send({ message: 'Карточка с данным id не существует.' });
      }
      else {
        res.status(errCodeDefault).send({ message: defaultErrorMessage });
      }
    })
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  cardSchema.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(errCodeInvalidData).send({ message: 'Данные введены некорректно.' });
      }
      else {
        res.status(errCodeDefault).send({ message: defaultErrorMessage });
      }
    });
};

module.exports.addLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(errCodeNotFound).send({ message: 'Данного id не существует.' });
      }
      if (err.name === 'CastError') {
        return res.status(errCodeInvalidData).send({ message: 'Данные для лайка некорректные.' });
      }
      else {
        res.status(errCodeDefault).send({ message: err.message });
      }
    });
};

module.exports.deleteLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(errCodeNotFound).send({ message: 'Данного id не существует.' });
      }
      if (err.name === 'CastError') {
        return res.status(errCodeInvalidData).send({ message: 'Данные для лайка некорректные.' });
      }
      else {
        res.status(errCodeDefault).send({ message: err.message });
      }
    });
};