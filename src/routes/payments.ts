import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/payment-intents', authenticateToken, createPaymentIntent);

export default router;
    