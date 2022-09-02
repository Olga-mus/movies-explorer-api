const mongoose = require('mongoose');

const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 20, // а максимальная — 30 символов
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'Введите корректный email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
