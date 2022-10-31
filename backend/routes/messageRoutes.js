const express = require('express');
const router = express.Router();
const messageControllers = require('../controllers/messageControllers');
const passport = require('../middlewares/passport')
// const {passport} = require('../middlewares/passport')

// router.get('/message/:message_sender/:message_recipient', messageControllers.getAllMessages);
router.get('/message/:id', messageControllers.getAllMessages);
router.post('/message', messageControllers.sendMessage);
// router.post('/message',passport.authenticate('jwt', { session: false }), messageControllers.sendMessage);
router.post('/messages', messageControllers.deleteMessage);

module.exports = router;
