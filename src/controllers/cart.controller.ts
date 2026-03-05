import { Request, Response } from 'express';
import {
    fetchCartItems,
    initCartItem,
    patchCartItem,
    deleteCartItem
} from '../services/cart.service';

export async function getCartItems(req: Request, res: Response) {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: 'Missing userId' });
        }
        const cartItems = await fetchCartItems(userId);
        return res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cart items' });
    }
}

export async function addCartItem(req: Request, res: Response) {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if item already exists in cart
        const existingCartItems = await fetchCartItems(userId);
        const existingItem = existingCartItems.find(
            (item) => item.productId === parseInt(productId)
        );

        if (existingItem) {
            // If item exists, update quantity instead of returning error
            const updatedCartItem = await patchCartItem(
                parseInt(userId),
                parseInt(productId),
                existingItem.quantity + parseInt(quantity)
            );
            return res.json({
                message: 'Cart item quantity updated successfully',
                cartItem: updatedCartItem
            });
        }

        // If item doesn't exist, create new cart item
        const newCartItem = await initCartItem(
            parseInt(userId),
            parseInt(productId),
            parseInt(quantity)
        );

        return res.status(201).json({
            message: 'Item added to cart successfully',
            cartItem: newCartItem
        });
    } catch (error) {
        console.error('Error in addCartItem:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
}

export async function updateCartItem(req: Request, res: Response) {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Use patchCartItem which handles both update and create
        const updatedCartItem = await patchCartItem(
            parseInt(userId),
            parseInt(productId),
            parseInt(quantity)
        );

        return res.json({
            message: 'Cart item updated successfully',
            cartItem: updatedCartItem
        });
    } catch (error) {
        console.error('Error in updateCartItem:', error);
        res.status(500).json({ error: 'Failed to update cart item' });
    }
}

export async function removeCartItem(req: Request, res: Response) {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const deletedCartItem = await deleteCartItem(
            parseInt(userId),
            parseInt(productId)
        );
        return res.json({
            message: 'Cart item deleted successfully',
            cartItem: deletedCartItem
        });
    } catch (error) {
        console.error('Error in deleteCartItem:', error);
        res.status(500).json({ error: 'Failed to delete cart item' });
    }
}
