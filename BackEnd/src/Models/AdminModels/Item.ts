// models/AdminModels/Item.ts
import mongoose, { Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  price: number;
}

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Item = mongoose.model<IItem>('Item', ItemSchema);

export default Item;
