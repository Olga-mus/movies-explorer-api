const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { isAuthorized } = require('../middlewares/isAuthorized');
const { createUser, login } = require('../controllers/users');
const { validateUser, validateAuthorization } = require('../middlewares/validation');

router.post('/signup', validateUser, createUser);

router.post('/signin', validateAuthorization, login);

router.use('/users', isAuthorized, userRouter);
// запускаем, при запросе на '/users' срабатывает роутер './routes/users'

router.use('/movies', isAuthorized, movieRouter);
// запускаем, при запросе на '/movies' срабатывает роутер './routes/movies'

module.exports = router;
