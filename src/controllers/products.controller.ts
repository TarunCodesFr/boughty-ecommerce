import { Request, Response } from 'express';
import { createProductInput } from '../validators/product.validator';
import {
    createProductInDB,
    getAllProducts,
    fetchProductById,
    updateProductInDB
} from '../services/products.service';

export async function getProducts(req: Request, res: Response) {
    const products = await getAllProducts();
    return res.json(products);
}

export async function getProductById(req: Request, res: Response) {
    const id = req.body.id;
    const product = await fetchProductById(id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(product);
}

export async function createProduct(req: Request, res: Response) {
    const validation = createProductInput.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            error: validation.error.issues.map((e) => e.message)
        });
    }

    const { name, description, price } = validation.data;
    const newProduct = await createProductInDB(name, description, price);

    return res.status(201).json({
        message: 'Product created successfully',
        product: newProduct
    });
}

export async function updateProduct(req: Request, res: Response) {
    // const id = req.body.id;
    const { id, name, description, price } = req.body;
    const updatedProduct = await updateProductInDB(
        id,
        name,
        description,
        price
    );
    return res.json({
        message: 'Product updated successfully',
        product: updatedProduct
    });
}
