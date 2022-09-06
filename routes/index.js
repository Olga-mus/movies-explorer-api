const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const pageNotFound = require('../middlewares/pageNotFound');
const { isAuthorized } = require('../middlewares/isAuthorized');
const { createUser, login } = require('../controllers/users');
const { validateUser, validateAuthorization } = require('../middlewares/validation');

router.post('/signup', validateUser, createUser);

router.post('/signin', validateAuthorization, login);

router.use('/users', isAuthorized, userRouter);
// запускаем, при запросе на '/users' срабатывает роутер './routes/users'

router.use('/movies', isAuthorized, movieRouter);
// запускаем, при запросе на '/movies' срабатывает роутер './routes/movies'

router.use('*', isAuthorized, pageNotFound);

module.exports = router;
