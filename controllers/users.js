// это файл контроллеров

const bcrypt = require('bcryptjs'); // импортируем bcrypt
const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');
const NotFound = require('../errors/error404');
const Unauthorized = require('../errors/error401');
const BadRequest = require('../errors/error400');
const Conflict = require('../errors/error409');

const SALT_ROUNDS = 10;

const {
  created,
  MONGO_DUPLICATE_ERROR_CODE,
} = require('../constants/constant');
// const user = require('../models/user');

// получаем инф о текущем пользователе
module.exports.getCurrentUserProfile = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => new NotFound('Пользователь не существует'))
    .then((user) => res.send(user))
    .catch(next);
};

// обновляем данные пользователя
module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFound('Пользователь с таким id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new Conflict('Такой email уже занят'));
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// // дорабатываем контроллер создание пользователя
// module.exports.createUser = (req, res, next) => {
//   const {
//     name, email, password,
//   } = req.body;
//   // если емэйл и пароль отсутствует - возвращаем ошибку.

//   bcrypt
//     .hash(password, SALT_ROUNDS)
//     // eslint-disable-next-line arrow-body-style
//     .then((hash) => {
//       return User.create({
//         name,
//         email,
//         password: hash, // записываем хеш в базу,
//       });
//     })
//     // пользователь создан
//     .then((user) => res.status(created).send({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     }))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new BadRequest('Невалидные данные пользователя'));
//       } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
//         next(new Conflict('Email занят'));
//       } else {
//         next(err);
//       }
//     });
// };

// дорабатываем контроллер создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  // если емэйл и пароль отсутствует - возвращаем ошибку.

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      email,
      password: hash, // записываем хеш в базу,
    }))
    // пользователь создан
    .then((user) => res.status(created).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Невалидные данные пользователя'));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new Conflict('Email занят'));
      } else {
        next(err);
      }
    });
};

// логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        // Инструкция throw генерирует исключение и обработка кода
        // переходит в следующий блок catch(next)
        throw new Unauthorized('Неправильная почта или пароль');
      } else {
        return bcrypt
          .compare(password, user.password)
          .then((isPasswordCorrect) => {
            if (!isPasswordCorrect) {
              throw new Unauthorized('Неправильная почта или пароль');
            } else {
              const token = generateToken({ _id: user._id.toString() });
              res.send({ token });
            }
          }).catch(() => next(new Unauthorized('Неправильная почта или пароль')));
      }
    })
    .catch(next);
};
