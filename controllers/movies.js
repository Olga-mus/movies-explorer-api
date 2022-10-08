const Movie = require('../models/movie');

const BadRequest = require('../errors/error400');
const Forbidden = require('../errors/error403');
const NotFound = require('../errors/error404');
const InternalServerError = require('../errors/error500');

// возвращает все сохранённые текущим  пользователем фильмы
module.exports.getAllSaveFilms = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

// создаёт фильм с переданными в теле
//  country, director, duration, year, description,
// image, trailerLink, nameRU, nameEN и thumbnail, movieId
module.exports.createFilm = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      res
        .status(201)
        .send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(new InternalServerError('Что-то пошло не так'));
      }
    });
};

// удаляем фильм
module.exports.deleteFilmId = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        next(new NotFound('Фильм с таким id не найден'));
        return;
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        next(new Forbidden('Нельзя удалить этот фильм'));
        return;
      }
      movie.remove()
        .then(() => {
          res.send({ message: 'Фильм успешно удален' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(new InternalServerError('Что-то пошло не так'));
      }
    });
};
