const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/token', userController.token);
router.delete('/logout', userController.logout);
module.exports = router;
