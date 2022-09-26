const express = require('express');

const ProductsController = require('../controllers/productsController');

const router = express.Router();

router.get('/products', (req, res) => ProductsController.getAll(req, res));

module.exports = router;