import faker from "faker";
import Cartegory from "../model/cartegory.model";
import Product from "../model/product.model";
import Vendor from "../model/vendor.model";
import logger from "./logger";



export const generateCartegories = async () => {
    const categories = [];
    for (let i = 0; i < 10; i++) {
        const category = new Cartegory({
            name: faker.commerce.department(),
            description: faker.commerce.productDescription()
        })
        categories.push(category);
    }
    await Cartegory.insertMany(categories);
    logger.info("Cartegories generated");
}

export const generateVendor = async ()=> {
    const vendors = [];
    for (let i = 0; i < 10; i++) {
        const vendor = new Vendor({
            name: faker.company.companyName(),
            description: faker.company.catchPhrase(),
            user: '6571005efa3e7dd5944b8846',
            diliveryType: faker.random.arrayElement(['dilivery', 'pickup', 'both']),
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        vendors.push(vendor);
    }
    await Vendor.insertMany(vendors);
    logger.info("Vendors generated");
}


export const generateProducts = async () => {
    const cartegoryData = await Cartegory.find();
    const vendorData = await Vendor.find();
    const products = [];

    for (let i = 0; i < 10; i++){
        const product = new Product({
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            cartegory_id: faker.random.arrayElement(cartegoryData)._id,
            vendor_id: faker.random.arrayElement(vendorData)._id,
            price: faker.random.number({ min: 10, max: 1000, precision: 0.01 }),
            picture: 'default.jpg',
            quantity: faker.random.number({ min: 1, max: 100 }),
            owner: '6571005efa3e7dd5944b8846',
        })
        products.push(product);
    }

    await Product.insertMany(products);
    logger.info("Products generated");
}