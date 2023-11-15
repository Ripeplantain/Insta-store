import { Response, Request } from "express";
import { productData } from "../helper/validatre";
import { createProduct, getProduct, getProductByOwner, updateProduct, 
        deleteProduct, listProducts } from "../service/product.service";



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


// @desc   create product
// @route  POST /api/product
// @access Private
export const createProductController = async (req: Request, res: Response) => {
    try {
        const product: any = productData.parse(req.body);
        const newProduct = await createProduct(product);
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   list owner's products
// @route  GET /api/product
// @access Private
export const listOwnerProductsController = async (req: any, res: Response) => {
    try {
        const products = await getProductByOwner(req.user._id);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   list all products
// @route  GET /api/product
// @access Private
export const listProductsController = async (req: Request, res: Response) => {
    try {
        const products = await listProducts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   delete product
// @route  DELETE /api/product/:id
// @access Private
export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await deleteProduct(id);
        return res.status(200).json(deletedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   update product
// @route  PUT /api/product/:id
// @access Private
export const updateProductController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product: any = productData.parse(req.body);
        const updatedProduct = await updateProduct(id, product);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   get product
// @route  GET /api/product/:id
// @access Private
export const getProductController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await getProduct(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
}