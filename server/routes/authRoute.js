const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/reset-password', authController.initiateResetPassword);
router.post('/reset-password/confirm', authController.confirmResetPassword);
router.post('/change-password', authController.changePassword);

module.exports = router;