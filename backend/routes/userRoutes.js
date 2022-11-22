const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const userControllers = require('../controllers/userControllers');

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get(
    '/users/:id',
    passport.authenticate('jwt', { session: false }),
    userControllers.getAllUsersExceptCurrentUser
);
// router.get('/users', userControllers.getAllUsers);
router.get(
    '/user/:id',
    passport.authenticate('jwt', { session: false }),
    userControllers.getUser
);
router.put(
    '/user/:id',
    passport.authenticate('jwt', { session: false }),
    userControllers.updateUser
);
router.get(
    '/users',
    passport.authenticate('jwt', { session: false }),
    userControllers.searchUsers
);

module.exports = router;
