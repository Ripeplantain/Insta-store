import { z } from "zod";


export const userData = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    address: z.string().min(2).max(100),
    phoneNumber: z.string().min(2).max(100),
})

export const cartegoryData = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
})

export const productData = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
    cartegory_id: z.string().min(2).max(100),
    price: z.number().min(0),
    quantity: z.number().min(0),
    owner: z.string().min(2).max(100),
    picture: z.string().min(2).max(100),
})

export const orderData = z.object({
    product: z.array(z.string().min(2).max(100)),
    quantity: z.number().min(0),
    location: z.string().min(2).max(100),
    total: z.number().min(0),
    paymentState: z.string().min(2).max(100),
})