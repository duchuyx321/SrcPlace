const express = require('express');

const router = express.Router();

const AuthController = require('../app/Controller/AuthController');
const JwtMiddleware = require('../app/Middleware/JwtMiddleware');

// [POST] --/auth
router.post(
    '/pre-login-check',
    JwtMiddleware.verifyTempToken,
    AuthController.PrevLoginCheck,
);
router.post(
    '/send-mail',
    JwtMiddleware.verifyTempToken,
    AuthController.sendCodeTOMail,
);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

module.exports = router;
