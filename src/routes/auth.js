const express = require('express');

const router = express.Router();

const AuthController = require('../app/Controller/AuthController');
const JwtMiddleware = require('../app/Middleware/JwtMiddleware');
const { uploadCloudinary } = require('../app/Middleware/CloudinaryMiddleware');

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
router.post(
    '/register',
    uploadCloudinary({ type: 'Avatar' }).single('file'),
    AuthController.register,
);
router.post(
    '/refresh',
    JwtMiddleware.verifyRefreshToken,
    AuthController.refresh,
);
router.post('/logout', AuthController.logout);

module.exports = router;
