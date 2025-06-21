const express = require('express');

const router = express.Router();

const user = require('./user');
const projects = require('./user');
const categories = require('./categories');

router.use('/user', user);
router.use('/projects', projects);
router.use('/categories', categories);

module.exports = router;
