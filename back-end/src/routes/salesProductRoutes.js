const express = require('express');

const salesProductController = require('../controllers/salesProductController');

const router = express.Router();

router.post('/sales', (req, res) => salesProductController.createSales(req, res));

module.exports = router;