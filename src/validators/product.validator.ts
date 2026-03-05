import z from 'zod';

export const createProductInput = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(255),
    price: z.number().positive()
});
