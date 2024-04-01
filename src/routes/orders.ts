import express from 'express';
import { placeOrder, getOrderHistory, trackOrder } from '../controllers/orderControllers';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Place an order
router.post('/', authenticateToken, placeOrder);

// Get order history for a user
router.get('/history/:userId', authenticateToken, getOrderHistory);

// Track order by order ID
router.get('/:orderId', authenticateToken, trackOrder);

export default router;
