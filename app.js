require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limit } = require('./middlewares/rateLimiter');
const { centralHandlerErrors } = require('./middlewares/centralHandlerErrors');
const { MONGO_DB, DOMAINS } = require('./constants/constant');
const routes = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;
mongoose.connect(MONGO_DB);

app.use(requestLogger); // подключаем логгер запросов
app.use(limit);

app.use(cors(DOMAINS));

app.use(helmet());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(routes);
// app.use(pageNotFound);
app.use(errorLogger); // подключаем логгер ошибок
// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// централизованный обрабочик ошибок
app.use(centralHandlerErrors);

app.listen(PORT);
