const express = require('express');

const salesController = require('../controllers/salesController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const router = express.Router();

router.post(
  '/sales',
  authenticationMiddleware,
  (req, res) => salesController.create(req, res),
);

router.get(
  '/sales/:id',
  authenticationMiddleware,
  (req, res) => salesController.getById(req, res),
);

module.exports = router;