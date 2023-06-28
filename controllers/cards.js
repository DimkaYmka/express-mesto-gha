const cardSchema = require('../models/card');

module.exports.getCards = (req, res) => {
  cardSchema.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  cardSchema.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Карточка с данным id не существует.' });
      }
      else {
        res.status(500).send({ message: err.message });
      }
    })
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  cardSchema.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Данные введены некорректно.' });
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.addLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Данного id не существует.' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные для лайка некорректные.' });
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.deleteLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Данного id не существует.' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные для лайка некорректные.' });
      }
      else {
        res.status(500).send({ message: err.message });
      }
    });
};