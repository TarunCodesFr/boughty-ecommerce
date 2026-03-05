import prisma from '../client/prisma';

export async function fetchCartItems(userId: string) {
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: parseInt(userId) },
            include: {
                product: true
            }
        });
        return cartItems;
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        throw new Error('Failed to retrieve cart items');
    }
}

export async function initCartItem(
    userId: number,
    productId: number,
    quantity: number
) {
    try {
        const cartItem = await prisma.cartItem.create({
            data: {
                userId,
                productId,
                quantity
            }
        });
        return cartItem;
    } catch (error) {
        console.error('Error creating cart item:', error);
        throw new Error('Failed to create cart item');
    }
}

export async function patchCartItem(
    userId: number,
    productId: number,
    quantity: number
) {
    try {
        const newCartItem = await prisma.cartItem.upsert({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            },
            update: {
                quantity
            },
            create: {
                userId,
                productId,
                quantity
            }
        });
        return newCartItem;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw new Error('Failed to update cart item');
    }
}

export async function deleteCartItem(userId: number, productId: number) {
    try {
        await prisma.cartItem.delete({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        throw new Error('Failed to delete cart item');
    }
}
