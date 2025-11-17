const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/:id', userController.getUserById);
router.get('/:id/saved', userController.getSavedPins);

// Protected routes
router.post('/:id/follow', authMiddleware, userController.toggleFollow);

module.exports = router;
