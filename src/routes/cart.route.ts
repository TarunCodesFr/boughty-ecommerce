import { Router } from 'express';
import {
    addCartItem,
    getCartItems,
    updateCartItem,
    removeCartItem
} from '../controllers/cart.controller';
import { authGuard } from '../middlewares/auth.middleware';

const router = Router();

router.get('/cart', authGuard, getCartItems);
router.post('/cart', authGuard, addCartItem);
router.patch('/cart', authGuard, updateCartItem);
router.delete('/cart', authGuard, removeCartItem);

export default router;
