const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Notification = require("../controllers/Notification");

router.post('/accept', auth, Notification.acceptNotification);


module.exports = router;