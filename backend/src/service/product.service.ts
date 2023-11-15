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
    return await Product.find();
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

// export const getProductByCategory = async (id: string) => {
//     return await Product.find({ cartegory_id: id });
// }

export const getProductByOwner = async (id: string) => {
    return await Product.find({ owner: id });
}
