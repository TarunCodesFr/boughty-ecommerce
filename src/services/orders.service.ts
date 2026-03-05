import { id } from 'zod/v4/locales';
import prisma from '../client/prisma';

export async function fetchAllOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                items: true
            }
        });

        // Fetch products separately if needed
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Failed to fetch orders');
    }
}

export async function fetchOrderById(orderId: number) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw new Error('Failed to fetch order');
    }
}

export async function initOrder(userId: number) {
    try {
        const order = await prisma.$transaction(async (tx) => {
            // 1️⃣ Get cart items
            const cartItems = await tx.cartItem.findMany({
                where: { userId },
                include: {
                    product: true
                }
            });

            if (cartItems.length === 0) {
                throw new Error('Cart is empty');
            }

            // 2️⃣ Calculate total
            const total = cartItems.reduce((sum, item) => {
                return sum + item.product.price * item.quantity;
            }, 0);

            // 3️⃣ Create order
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    total
                }
            });

            // 4️⃣ Create order items
            await tx.orderItem.createMany({
                data: cartItems.map((item) => ({
                    orderId: newOrder.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            });

            // 5️⃣ Clear cart
            await tx.cartItem.deleteMany({
                where: { userId }
            });

            return newOrder;
        });

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
}
