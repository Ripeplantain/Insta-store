import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcrypt";


const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['farmer', 'buyer', 'admin'], default: 'farmer'},
    isVerified: {type: Boolean, required: true, default: false},
    address: {type: String, required: false},
    phoneNumber: {type: String, required: false},
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now},
})

UserSchema.pre('save', async function(next: any){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.comparePassword = async function(password: string){
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error: any) {
        throw new Error(error);
    }
}

const User = mongoose.model("User", UserSchema);
export default User;