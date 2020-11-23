const express = require('express');
const router = express.Router();
const Contact = require("../controllers/Contact");
const auth = require('../middleware/auth');


// * PENDING CONTACT
router.post('/friend-request', auth, Contact.sendFriendRequest);
router.post('/accept-friend/:id', auth, Contact.acceptFriend);
router.delete('/decline-friend/:id', auth, Contact.declineFriend);

// * ALREADY FRIEND
router.delete('/delete-friend/:id', auth, Contact.deleteFriend);

module.exports = router;