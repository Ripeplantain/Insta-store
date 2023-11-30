import User from "../model/user.model";


interface User {
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
}


export const createUser = async (user: User) => {
    const newUser = new User(user);
    return await newUser.save();
}

export const findUserByEmail = async (email: string) => {
    return await User.findOne({email: email});
}

export const findUserById = async (id: string) => {
    return await User.findById(id);
}

export const updateVendorField = async (id: string, field: string, value: any) => {
    return await User.findByIdAndUpdate(id, {[field]: value}, {new: true});
}
