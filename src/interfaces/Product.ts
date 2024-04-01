// interfaces/Product.ts
import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  // Add other fields as needed
}
