const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/user', (req, res) => UserController.create(req, res));
router.get('/user/:role', (req, res) => UserController.getAll(req, res));
module.exports = router;