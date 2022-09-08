const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const pageNotFound = require('../middlewares/pageNotFound');
const { isAuthorized } = require('../middlewares/isAuthorized');
const { createUser, login } = require('../controllers/users');
const { validateUser, validateAuthorization } = require('../middlewares/validation');

router.post('/signup', validateUser, createUser);

router.post('/signin', validateAuthorization, login);

router.use(isAuthorized);

router.use('/users', userRouter);
// запускаем, при запросе на '/users' срабатывает роутер './routes/users'

router.use('/movies', movieRouter);
// запускаем, при запросе на '/movies' срабатывает роутер './routes/movies'

router.use('*', pageNotFound);

module.exports = router;
