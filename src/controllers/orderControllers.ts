import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";
import Product from "../models/Product"; // Import the Product model
import { calculateTotalAmount } from "../utils/orderUtils"; // Import the calculateTotalAmount function

export const placeOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, items, shippingAddress } = req.body;

    // Calculate total amount based on item prices and quantities
    const totalAmount = await calculateTotalAmount(items);

    // Create new order
    const order = new Order({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
      status: "Pending",
    });

    // Save the order to the database
    await order.save();

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getOrderHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    // Find orders for the user
    const orders = await Order.find({ user: userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const trackOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    // Find order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
