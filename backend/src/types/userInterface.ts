import mongoose from "mongoose";


interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    address: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

export {
    type IUser
}
