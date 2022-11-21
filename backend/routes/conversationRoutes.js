const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport');
const conversationControllers = require('../controllers/conversationControllers');

router.post(
    '/conversation',
    passport.authenticate('jwt', { session: false }),
    conversationControllers.findOrCreateConversation
);
router.get(
    '/conversation/:_id',
    passport.authenticate('jwt', { session: false }),
    conversationControllers.getRecentConversation
);

module.exports = router;
