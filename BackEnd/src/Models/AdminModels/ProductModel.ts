import mongoose, { Schema, Document } from 'mongoose';

export interface ProductDocument extends Document {
    Admin_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    };
    title: string;
    description: string;
    image : string;
}

const ProductSchema = new Schema<ProductDocument>({
    Admin_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String,}
});

export default mongoose.model<ProductDocument>('Products', ProductSchema);
