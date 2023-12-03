import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    venor:{type: mongoose.Schema.Types.ObjectId, ref: 'Vendor'},
    quantity: { type: Number, required: true },
    status: { type: String, enum:['pending', 'delivered'] ,required: true, default: 'pending' },
    location: { type: String, required: true },
    total: { type: Number, required: true },
    paymentState: {type: String, enum:['pending', 'paid'] ,required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})




const Order = mongoose.model('Order', OrderSchema);
export default Order;