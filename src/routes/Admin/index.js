const express = require('express');

const router = express.Router();

const user = require('./user');
const projects = require('./projects');
const categories = require('./categories');
const payments = require('./payments');
const paymentMethods = require('./paymentMethods');

router.use('/user', user);
router.use('/projects', projects);
router.use('/categories', categories);
router.use('/payments', payments);
router.use('/paymentMethods', paymentMethods);

module.exports = router;
