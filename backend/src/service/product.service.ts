import mongoose from "mongoose";
import Product from "../model/product.model";


interface Product {
    name: string;
    description: string;
    cartegory_id: string;
    price: number;
    quantity: number;
    owner: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
}


export const createProduct = async (product: Product) => {
    const newProduct = new Product(product);
    return await newProduct.save();
}

export const listProducts = async () => {
    return await Product.find({quantity: {$gt: 0}}).sort({createdAt: -1});
}

export const deleteProduct = async (id: string) => {
    return await Product.findByIdAndDelete(id);
}

export const updateProduct = async (id: string, product: Product) => {
    return await Product.findByIdAndUpdate(id, product, { new: true });
}

export const getProduct = async (id: string) => {
    return await Product.findById(id);
}

export const searchProduct = async (name: string) => {
    return await Product.find({ name: { $regex: name, $options: 'i' } }).sort({createdAt: -1});
}

export const getProductByOwner = async (id: string) => {
    return await Product.find({ owner: id });
}

export const getProductByCartegory = async (id: string) => {
    return await Product.find({ cartegory_id: id }).sort({createdAt: -1});
}

export const getProductByVendor = async (id: any) => {
    return await Product.find({ vendor_id: id }).sort({createdAt: -1});
}