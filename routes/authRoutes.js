import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { getAllUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', protect, admin, getAllUsers);

export default router;
