import express from 'express';
import { addItemToCart, updateCartItemQuantity, removeItemFromCart } from '../controllers/cartControllers';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Add item to cart
router.post('/add', authenticateToken, addItemToCart);

// Update item quantity in cart
router.put('/update/', authenticateToken, updateCartItemQuantity);

// Remove item from cart
router.delete('/remove/', authenticateToken, removeItemFromCart);

export default router;
