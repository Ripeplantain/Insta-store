import mongoose from "mongoose";
import faker from "faker";
import Cartegory from "../model/cartegory.model";
import Product from "../model/product.model";
import logger from "./logger";



export const generateCartegories = async () => {
    const categories = [];
    for (let i = 0; i < 5; i++) {
        const category = new Cartegory({
            name: faker.commerce.department(),
            description: faker.commerce.productDescription()
        })
        categories.push(category);
    }
    await Cartegory.insertMany(categories);
    logger.info("Cartegories generated");
}


export const generateProducts = async () => {
    const categories = await Cartegory.find();
    const products = [];

    for (let i = 0; i < 10; i++){
        const product = new Product({
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            cartegory_id: faker.random.arrayElement(categories)._id,
            price: faker.random.number({ min: 10, max: 1000, precision: 0.01 }),
            quantity: faker.random.number({ min: 1, max: 100 }),
            owner: '654ec3aa24dfc2703852c500',
        })
        products.push(product);
    }

    await Product.insertMany(products);
    logger.info("Products generated");
}