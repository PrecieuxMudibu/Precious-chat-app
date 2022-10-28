const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/users/:id', userControllers.getAllUsersExceptCurrentUser);
// router.get('/users', userControllers.getAllUsers);
router.get('/user/:id', userControllers.getUser);
router.put('/user/:id', userControllers.updateUser);

module.exports = router;
