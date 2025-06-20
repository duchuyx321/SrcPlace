const express = require('express');

const router = express.Router();

const MeController = require('../../app/Controller/MeController');
const {
    uploadCloudinary,
} = require('../../app/Middleware/CloudinaryMiddleware');
const VerifyCodesMiddleware = require('../../app/Middleware/VerifyCodeMiddleware');

// [GET]
router.get('/', MeController.getMyProfile);
// [PATCH]
router.patch(
    '/',
    uploadCloudinary({ type: 'Avatar' }).single('avatar'),
    MeController,
);
// [PATCH]
router.patch('/password', VerifyCodesMiddleware.VerifyCode);

module.exports = router;
