// controllers/cartController.ts
import { Request, Response } from "express";
import ShoppingCart, { ICartItem } from "../models/ShoppingCart";
import mongoose from "mongoose";

// Add item to cart
export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await ShoppingCart.findOne({ userId });

    // If cart exists, add item; otherwise, create a new cart
    if (cart) {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );
      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
      await ShoppingCart.create({ userId, items: [{ productId, quantity }] });
    }

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update item quantity in cart
export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body; // from req.body

    // Convert productId string to ObjectId
    const productIdObj =new mongoose.Types.ObjectId(productId.toString());

    const cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const cartItem: ICartItem | undefined = cart.items.find((item) =>
      item.productId.equals(productIdObj)
    );
    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.json({ success: true, message: "Cart item quantity updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body; // Access productId from req.body

    // Convert productId string to ObjectId
    const productIdObj = new mongoose.Types.ObjectId(productId.toString());

    const cart = await ShoppingCart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const updatedItems = cart.items.filter(
      (item) => !item.productId.equals(productIdObj)
    );
    cart.items = updatedItems;
    await cart.save();

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
