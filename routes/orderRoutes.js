import express from 'express';
import { createOrder, getOrderById, getUserOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);
router.get('/all', protect, admin, getAllOrders);
router.get('/:orderId', protect, getOrderById);
router.put('/:orderId/status', protect, admin, updateOrderStatus);

export default router;
