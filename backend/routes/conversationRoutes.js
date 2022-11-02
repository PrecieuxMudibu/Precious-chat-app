const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport')
const conversationControllers = require('../controllers/conversationControllers');

router.post('/conversation', passport.authenticate('jwt', { session: false }),conversationControllers.findOrCreateConversation);
router.get('/conversation/:_id', conversationControllers.getRecentConversation);
// router.get('/conversation/:message_sender/:message_recipient', conversationControllers.findConversation);

module.exports = router;