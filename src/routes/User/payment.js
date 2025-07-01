const express = require('express');

const router = express.Router();

const PaymentController = require('../../app/Controller/User/PaymentController');

// [GET]
// [POST]
router.post('/', PaymentController.createPayment);
// [PATCH]

// [DELETE]

module.exports = router;
