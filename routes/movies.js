const router = require('express').Router();

const { deleteFilmId, getAllSaveFilms, createFilm } = require('../controllers/movies');

const { validateDeleteFilmId, validateCreateFilm } = require('../middlewares/validation');

router.delete('/:_id', validateDeleteFilmId, deleteFilmId); // удаляет сохранённый фильм по id
router.get('/', getAllSaveFilms);// возвращает все сохранённые текущим  пользователем фильмы
router.post('/', validateCreateFilm, createFilm);// создаёт фильм с переданными в теле// country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

module.exports = router;
