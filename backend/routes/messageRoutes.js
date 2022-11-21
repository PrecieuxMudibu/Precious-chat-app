const express = require('express');
const router = express.Router();
const messageControllers = require('../controllers/messageControllers');
const passport = require('../middlewares/passport');

router.get(
    '/message/:id',
    passport.authenticate('jwt', { session: false }),
    messageControllers.getAllMessages
);
router.post(
    '/message',
    passport.authenticate('jwt', { session: false }),
    messageControllers.sendMessage
);
router.post(
    '/messages',
    passport.authenticate('jwt', { session: false }),
    messageControllers.deleteMessage
);

module.exports = router;
