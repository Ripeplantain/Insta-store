import Order from "../model/order.model";


interface Order {
    client: string;
    product: string;
    quantity: number;
    status: string;
    address: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}


export const createOrder = async (order: Order) => {
    const newOrder = new Order(order);
    return await newOrder.save();
}

export const listOrders = async () => {
    return await Order.find().sort({createdAt: -1});
}

export const deleteOrder = async (id: string) => {
    return await Order.findByIdAndDelete(id);
}

export const updateOrder = async (id: string, order: Order) => {
    return await Order.findByIdAndUpdate(id, order, { new: true });
}

export const getOrder = async (id: string) => {
    return await Order.findById(id);
}

export const getUserOrders = async (id: string) => {
    return await Order.find({ client: id }).sort({createdAt: -1});
}