const express = require('express');

const router = express.Router();
const me = require('./me');

// [User]
router.use('/me', me);

module.exports = router;
