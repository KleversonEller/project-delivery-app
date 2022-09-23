const express = require('express');

const salesProductController = require('../controllers/salesProductController');

const router = express.Router();

router.post('/sales', salesProductController.createSales);

module.exports = router;