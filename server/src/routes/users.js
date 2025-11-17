const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public routes
router.get('/:id', userController.getUserById);
router.get('/:id/saved', userController.getSavedPins);

module.exports = router;
