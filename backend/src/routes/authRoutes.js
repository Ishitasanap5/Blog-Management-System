import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected user routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;