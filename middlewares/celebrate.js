// const { celebrate, Joi } = require('celebrate');

// // const urlPattern = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;
// const urlPattern = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;

// const validationCreateUser = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(1),
//     avatar: Joi.string().regex(urlPattern),
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),

//   }),
// });

// const validationLogin = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(6),
//   }),
// });

// const validationUserId = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().length(24).hex(),
//   }),
// });

// const validationUpdateAvatar = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().regex(urlPattern),
//   }),
// });

// const validationUpdateUser = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     about: Joi.string().required().min(2).max(30),
//   }),
// });

// const validationCreateCard = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().regex(urlPattern),
//   }),
// });

// const validationCheckCard = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required().length(24).hex(),
//   }),
// });

// module.exports = {
//   validationCreateUser,
//   validationLogin,
//   validationUserId,
//   validationUpdateAvatar,
//   validationUpdateUser,
//   validationCreateCard,
//   validationCheckCard,
// };
