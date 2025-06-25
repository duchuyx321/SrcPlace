const express = require('express');

const router = express.Router();

const DashboardController = require('../../app/Controller/DashboardController');

// [GET]
router.get('/order', DashboardController.getOrderStatus);
router.get('/payment', DashboardController.getPaymentStatus);

module.exports = router;
