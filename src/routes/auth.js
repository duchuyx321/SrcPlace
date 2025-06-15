const express = require('express');

const router = express.Router();

const AuthController = require('../app/Controller/AuthController');

// [POST] --/auth
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

module.exports = router;
