import mongoose from "mongoose";



const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    diliveryType: {type: String, required: true, enum: ['dilivery', 'pickup', 'both'], default: 'dilivery'},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now},
})


const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;