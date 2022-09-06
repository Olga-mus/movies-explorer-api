const { ObjectId } = require('mongoose').Types;

const { Joi, celebrate } = require('celebrate');

const { invalidId } = require('../constants/constant');

const urlRegExp = /^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:%?#[\]@!$&='()*+,;]+#?$/i;
const isLatinSymbols = /^[?!,.A-Za-z0-9\s]+$/;
const isCyrillicSymbols = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
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
      .pattern(urlRegExp),
    trailerLink: Joi
      .string()
      .required()
      .pattern(urlRegExp),
    nameRU: Joi
      .string()
      .required()
      .pattern(isCyrillicSymbols),
    nameEN: Joi
      .string()
      .required()
      .pattern(isLatinSymbols),
    thumbnail: Joi
      .string()
      .required()
      .pattern(urlRegExp),
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
        .required()
        .hex()
        .length(24)
        .custom((value, helpers) => {
          if (ObjectId.isValid(value)) {
            return value;
          }
          return helpers.message(invalidId);
        }),
    }),
});

module.exports = {
  validateUser,
  validateAuthorization,
  urlRegExp,
  validatePatchUserProfile,
  validateCreateFilm,
  validateDeleteFilmId,
};
