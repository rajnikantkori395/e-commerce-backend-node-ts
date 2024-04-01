import { Request, Response } from 'express';
import stripe from '../config/stripe';

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
};
