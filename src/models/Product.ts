// models/Product.ts
import mongoose, { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/Product';

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // Add other fields as needed
});

export default model<IProduct>('Product', productSchema);
