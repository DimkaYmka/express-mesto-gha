const cardSchema = require('../models/card');

module.exports.getCards = (req, res) => {
  cardSchema.find({})
    .then(cards => res.status(201).send(cards))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  cardSchema.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(201).send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  cardSchema.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.addLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => res.status(201).send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.status(201).send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};