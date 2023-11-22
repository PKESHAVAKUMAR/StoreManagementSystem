import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: String,
  quantity: Number;
  // Add more fields as needed
}

const productSchema = new Schema<IProduct>({
  name: String,
  description: String,
  quantity: Number
  // Add more fields as needed
});

export const Product = model<IProduct>('Product', productSchema);