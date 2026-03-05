import { Request, Response } from 'express';
import {
    initOrder,
    fetchAllOrders,
    fetchOrderById
} from '../services/orders.service';

export async function getOrders(req: Request, res: Response) {
    try {
        const allOrders = await fetchAllOrders();
        res.json({ orders: allOrders });
    } catch (error: any) {
        res.status(400).json({
            error: error.message || 'Failed to fetch orders'
        });
    }
}

export async function getOrderById(req: Request, res: Response) {
    try {
        const orderId = req.body.orderId;
        const order = await fetchOrderById(orderId);
        res.json({ order });
    } catch (error: any) {
        res.status(400).json({
            error: error.message || 'Failed to fetch order'
        });
    }
}

export async function createOrder(req: Request, res: Response) {
    try {
        const userId = req.body.userId; // from JWT middleware

        const order = await initOrder(userId);

        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error: any) {
        res.status(400).json({
            error: error.message || 'Failed to create order'
        });
    }
}
