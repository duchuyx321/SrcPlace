const express = require('express');

const router = express.Router();

const PaymentController = require('../../app/Controller/User/PaymentController');

// [GET]
router.get('/callback', PaymentController.callback);
// [POST]
router.post('/', PaymentController.createPayment);
// [PATCH]

// [DELETE]

module.exports = router;
