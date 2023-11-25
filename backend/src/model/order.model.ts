import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number, required: true },
    status: { type: String, enum:['pending', 'delivered'] ,required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', OrderSchema);
export default Order;