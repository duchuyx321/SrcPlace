const express = require('express');

const router = express.Router();
const me = require('./me');
const TwoFA = require('./2fa');

// [User]
router.use('/me', me);
router.use('2fa', TwoFA);

module.exports = router;
