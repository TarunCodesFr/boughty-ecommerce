import { Router } from 'express';
import {
    getProducts,
    createProduct,
    getProductById,
    updateProduct
} from '../controllers/products.controller';
import { authGuard } from '../middlewares/auth.middleware';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/create-product', authGuard, createProduct);
router.put('/products/update', authGuard, updateProduct);

export default router;
