import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IShoppingCart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const shoppingCartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

export default mongoose.model<IShoppingCart>('ShoppingCart', shoppingCartSchema);
