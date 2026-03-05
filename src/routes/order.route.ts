import {
    createOrder,
    getOrderById,
    getOrders
} from '../controllers/orders.controller';
import { authGuard } from '../middlewares/auth.middleware';
import { Router } from 'express';

const router = Router();

router.post('/orders', authGuard, createOrder);
router.get('/orders', authGuard, getOrders);
router.get('/orders/id', authGuard, getOrderById);
export default router;
