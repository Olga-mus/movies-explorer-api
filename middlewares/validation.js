const { Joi, celebrate } = require('celebrate');

const urlRegExp = /^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:%?#[\]@!$&='()*+,;]+#?$/i;

// signup
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required(),
  }),
});
// signin
const validateAuthorization = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30),
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  }),
});

const validatePatchUserProfile = celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .min(2)
        .max(30),
      email: Joi
        .string()
        .email()
        .required(),
    }),
});

const validateCreateFilm = celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
    year: Joi
      .number()
      .required(),
    description: Joi
      .string()
      .required(),
    image: Joi
      .string()
      .required()
      .pattern(new RegExp(urlRegExp)),
    trailer: Joi
      .string()
      .required()
      .pattern(new RegExp(urlRegExp)),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
    thumbnail: Joi
      .string()
      .required()
      .pattern(new RegExp(urlRegExp)),
    movieId: Joi
      .number()
      .required(),
  }),
});

const validateDeleteFilmId = celebrate({
  params: Joi
    .object()
    .keys({
      _id: Joi
        .string()
        .required(),
    }),
});

module.exports = {
  validateUser,
  validateAuthorization,
  urlRegExp,
  validatePatchUserProfile,
};
