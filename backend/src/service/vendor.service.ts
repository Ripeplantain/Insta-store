import Vendor from "../model/vendor.model";


interface Vendor {
    name: string;
    user: string;
    diliveryType: string;
    createdAt: Date;
    updatedAt: Date;
}


export const createVendor = async (vendor: Vendor) => {
    const newVendor = new Vendor(vendor);
    return await newVendor.save();
}

export const listVendors = async () => {
    return await Vendor.find();
}

export const deleteVendor = async (id: string) => {
    return await Vendor.findByIdAndDelete(id);
}

export const updateVendor = async (id: string, vendor: Vendor) => {
    return await Vendor.findByIdAndUpdate(id, vendor);
}

export const getVendor = async (id: string) => {
    return await Vendor.findById(id);
}

