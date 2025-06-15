const express = require('express');

const router = express.Router();

const PublicController = require('../app/Controller/PublicController');

// [GET] --/
router.get('/', PublicController.getProject);

module.exports = router;
