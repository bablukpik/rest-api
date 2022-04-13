const express = require('express');
const auth = require("../middlewares/auth");
const usersController = require('../controllers/users');

const router = express.Router();

router.get("/me", auth, usersController.getMe);

module.exports = router;
