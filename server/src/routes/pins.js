const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const pinController = require('../controllers/pinController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Validation rules
const pinValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
];

// Public routes
router.get('/', pinController.getPins);
router.get('/user/:userId', pinController.getUserPins);
router.get('/:id/related', pinController.getRelatedPins);
router.get('/:id', pinController.getPin);

// Protected routes (require authentication)
router.post('/', authMiddleware, upload.single('image'), pinValidation, pinController.createPin);
router.put('/:id', authMiddleware, pinController.updatePin);
router.delete('/:id', authMiddleware, pinController.deletePin);
router.post('/:id/like', authMiddleware, pinController.toggleLike);
router.post('/:id/save', authMiddleware, pinController.toggleSave);
router.post('/:id/comments', authMiddleware, pinController.addComment);

module.exports = router;
