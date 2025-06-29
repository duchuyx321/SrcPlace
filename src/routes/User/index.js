const express = require('express');

const router = express.Router();
const me = require('./me');
const TwoFA = require('./2fa');
const card = require('./card');
const payment = require('./payment');

// [User]
router.use('/me', me);
router.use('/2fa', TwoFA);
router.use('/card', card);
router.use('/payment', payment);

module.exports = router;
