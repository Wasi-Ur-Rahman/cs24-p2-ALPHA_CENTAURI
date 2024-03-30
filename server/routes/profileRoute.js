const express = require('express');
const profileController = require("../controllers/profileController");

const router = express.Router();

router.get('/profile', profileController.getUserProfile);
router.put("/profile", profileController.updateUserProfile);

module.exports = router;