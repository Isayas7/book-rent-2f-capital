import { z } from 'zod';


export const createBookSchema = z.object({
    title: z.string(),
    author: z.string(),
    category: z.string(),
    quantity: z.number().int().positive(),
    isAvailable: z.boolean(),
});

export const updateBookSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    quantity: z.number().int().positive().optional(),
    isAvailable: z.boolean().optional(),
});

