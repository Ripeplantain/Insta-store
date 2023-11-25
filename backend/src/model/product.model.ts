import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    cartegory_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Cartegory'},
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    picture: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

ProductSchema.index({name: 'text'});

const Product = mongoose.model('Product', ProductSchema);
export default Product;