import prisma from '../client/prisma';

export async function getAllProducts() {
    return prisma.product.findMany();
}

export async function fetchProductById(id: number) {
    return prisma.product.findUnique({
        where: { id }
    });
}

export async function createProductInDB(
    name: string,
    description: string,
    price: number
) {
    return prisma.product.create({
        data: {
            name,
            description,
            price
        }
    });
}

export async function updateProductInDB(
    id: number,
    name?: string,
    description?: string,
    price?: number
) {
    const existingProduct = await prisma.product.findUnique({
        where: { id }
    });
    if (!existingProduct) {
        throw new Error('Product not found');
    }
    return prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price
        }
    });
}
