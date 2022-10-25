const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/users', userControllers.getAllUsers);
router.get('/users/:id', userControllers.getUser);

module.exports = router;
