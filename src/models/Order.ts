import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: { productId: mongoose.Types.ObjectId, quantity: number }[];
  totalAmount: number;
  shippingAddress: string;
  status: string;
}

const orderSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: { type: mongoose.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, required: true } }],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'], default: 'Pending' },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
