const express = require('express');

const router = express.Router();

const ApiController = require('../app/Controller/ApiController');

// [GET] --/api

//[POST] --api
router.post('/payment/callback', ApiController.paymentCallback);

module.exports = router;
