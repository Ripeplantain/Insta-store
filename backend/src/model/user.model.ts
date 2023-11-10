import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['user', 'admin'], default: 'user'},
    isVerified: {type: Boolean, required: true, default: false},
    address: {type: String, required: false},
    phoneNumber: {type: String, required: false},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now},
})

const User = mongoose.model("User", UserSchema);
export default User;