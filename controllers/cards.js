/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
const cardSchema = require('../models/card');
const {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  defaultErrorMessage,
} = require('../utils/errors');

const NotFoundError = require('../errors/400');
const AuthError = require('../errors/401');
const BadRequestError = require('../errors/404');
const ConflictError = require('../errors/409');
const ForbiddenError = require('../errors/403');

module.exports.getCards = (req, res, next) => {
  cardSchema.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// module.exports.deleteCard = (req, res, next) => {
//   const { cardId } = req.params;

//   cardSchema
//     .findByIdAndRemove(cardId)
//     .orFail()
//     .then((card) => {
//       const ownerId = card.owner.toString();
//       if (ownerId !== cardId) {
//         throw new ForbiddenError('Вы не являетесь автором этой карточки.');
//       }
//       return card;
//     })
//     .then((card) => cardSchema.deleteOne(card))
//     .then((card) => res.send(card))
//     .catch((err) => {
//       if (err.name === 'DocumentNotFoundError') {
//         return next(new NotFoundError('Карточка с данным id не существует.'));
//       }
//       if (err.name === 'CastError') {
//         return next(new BadRequestError('Карточка не существует.'));
//       } else {
//         return next(err);
//       }
//     });
// };

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  // cardSchema
  //   .findByIdAndRemove(cardId)
  //   .orFail()
  //   .then((card) => {
  //     const ownerId = card.owner.toString();
  //     if (ownerId !== cardId) {
  //       throw new ForbiddenError('Вы не являетесь автором этой карточки.');
  //     }
  //     return card;
  //   })
  //   .then((card) => cardSchema.deleteOne(card))
  //   .then((card) => res.send(card))
  //   .catch((err) => {
  //     if (err.name === 'DocumentNotFoundError') {
  //       return next(new NotFoundError('Карточка с данным id не существует.'));
  //     }
  //     if (err.name === 'CastError') {
  //       return next(new BadRequestError('Карточка не существует.'));
  //     } else {
  //       return next(err);
  //     }
  //   });
  cardSchema.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не существует.');
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не являетесь автором этой карточки.'));
      }
      return card.deleteOne().then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  cardSchema.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Введены неверные данные'));
      }
      return next(err);
    });
};

module.exports.addLikeCard = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Карточки с данным id не существует.'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Данные для лайка некорректные.'));
      }
      return next(err);
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  cardSchema.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    // .orFail()
    // .then((card) => res.send(card))
    // .catch((err) => {
    //   if (err.name === 'CastError') {
    //     return next(new BadRequestError('Данные для лайка некорректные.'));
    //   }
    //   if (err.name === 'DocumentNotFoundError') {
    //     return next(new NotFoundError('Карточки с данным id не существует.'));
    //   }
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с данным id не существует.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Данные для лайка некорректные.'));
      }
      return next(err);
    });
};
