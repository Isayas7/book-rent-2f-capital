import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const registerSchema = z
    .object({
        email: z.string().email({
            message: "please enter valid email",
        }),
        location: z.string().min(2, {
            message: "please enter location",
        }),
        phoneNumber: z.string().min(6, {
            message: "please enter phone Number",
        }),
        role: z.enum([UserRole.ADMIN, UserRole.CUSTOMER, UserRole.OWNER], {
            message: "Invalid role selected",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long"
        }),
        confirmPassword: z.string().min(2, {
            message: "Password must be at least 6 characters long",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"],
    });

export const loginSchema = z
    .object({
        email: z.string().email({
            message: "please enter valid email",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long"
        }),
    })


export const createBookSchema = z.object({
    bookName: z.string(),
    authorName: z.string(),
    category: z.string(),
    quantity: z.number().int().positive(),
    rentPrice: z.number().int().positive(),
    isAvailable: z.boolean().optional(),
});

export const updateBookSchema = z.object({
    bookName: z.string().optional(),
    authorName: z.string().optional(),
    category: z.string().optional(),
    quantity: z.number().int().positive().optional(),
    rentPrice: z.number().int().positive(),
    isAvailable: z.boolean().optional(),
});

