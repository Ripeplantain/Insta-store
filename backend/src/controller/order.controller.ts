import { Response, Request } from "express";
import { orderData } from "../helper/validatre";
import { createOrder, listOrders, getUserOrders, getOrder,
        updateOrder, deleteOrder} from "../service/order.service";
import logger from "../helper/logger";



// @desc   create order
// @route  POST /api/order
// @access Private
export const createOrderController = async (req: Request, res: Response) => {
    try {
        const order: any = orderData.parse(req.body);
        const newOrder = await createOrder(order);
        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   list all orders
// @route  GET /api/order
// @access Private
export const listOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await listOrders();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   list user's orders
// @route  GET /api/order/user
// @access Private
export const listUserOrdersController = async (req: any, res: Response) => {
    try {
        const user = req.payload;
        logger.info(user);
        if(!user) return res.status(401).json({message: "Unauthorized"});
        const orders = await getUserOrders(user._id);
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   get order
// @route  GET /api/order/:id
// @access Private
export const getOrderController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await getOrder(id);
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   update order
// @route  PUT /api/order/:id
// @access Private
export const updateOrderController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order: any = orderData.parse(req.body);
        const updatedOrder = await updateOrder(id, order);
        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// @desc   delete order
// @route  DELETE /api/order/:id
// @access Private
export const deleteOrderController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedOrder = await deleteOrder(id);
        return res.status(200).json(deletedOrder);
    } catch (error) {
        return res.status(500).json(error);
    }
}