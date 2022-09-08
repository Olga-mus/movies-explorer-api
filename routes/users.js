const router = require('express').Router(); // создали роутер

module.exports = router; // экспортировали роутер

const { getCurrentUserProfile, updateCurrentUser } = require('../controllers/users');
const { validatePatchUserProfile } = require('../middlewares/validation');

router.get('/me', getCurrentUserProfile); // возвращает информацию о пользователе (email и имя)
router.patch('/me', validatePatchUserProfile, updateCurrentUser); // обновляет информацию о пользователе (email и имя)
