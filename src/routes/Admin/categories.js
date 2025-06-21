const express = require('express');

const router = express.Router();

const CategoriesController = require('../../app/Controller/CategoriesController');

// [GET]
router.get('/overview');
// [POST]
router.post('/add', CategoriesController.addCategories);
// [PATCH]
router.patch('/edit', CategoriesController.editCategories);
router.patch('/restore', CategoriesController.restoreCategories);
// [DELETE]
router.delete('/delete', CategoriesController.deleteCategories);
router.delete('/destroy', CategoriesController.destroyCategories);

module.exports = router;
