require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
// const userRouter = require('./routes/users');
// const movieRouter = require('./routes/movies');
// const { isAuthorized } = require('./middlewares/isAuthorized');
const pageNotFound = require('./middlewares/pageNotFound');
// const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { validateUser, validateAuthorization } = require('./middlewares/validation');
const { limit } = require('./middlewares/rateLimiter');
const { centralHandlerErrors } = require('./middlewares/centralHandlerErrors');
const { MONGO_DB, DOMAINS } = require('./constants/constant');
const routes = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

// app.use(cors({
//   origin: [
//     'https://olganum.nomorepartiesxyz.ru',
//     'http://olganum.nomorepartiesxyz.ru',
//     'http://localhost:3000',
//   ],
//   credentials: true,
// }));

app.use(cors(DOMAINS));

app.use(helmet());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// подключаемся к серверу mongo
mongoose.connect(MONGO_DB);
// mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.use(requestLogger); // подключаем логгер запросов
app.use(limit);
// app.post('/signup', validateUser, createUser);

// app.post('/signin', validateAuthorization, login);

// app.use('/users', isAuthorized, userRouter);
// // запускаем, при запросе на '/users' срабатывает роутер './routes/users'

// app.use('/movies', isAuthorized, movieRouter);
// // запускаем, при запросе на '/movies' срабатывает роутер './routes/movies'

app.use(routes);
app.use(pageNotFound);
app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// централизованный обрабочик ошибок
app.use(centralHandlerErrors);
// eslint-disable-next-line consistent-return
// app.use((err, req, res, next) => {
//   if (err.statusCode) {
//     return res.status(err.statusCode).send({ message: err.message });
//   }
//   res.status(500).send({ message: 'Что-то пошло не так' });
//   next();
// });

app.listen(PORT);
