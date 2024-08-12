import prisma from "../utils/connect.js";
import { z } from "zod";
import { UserStatus, RentStatus, BookStatus } from "@prisma/client";
import defineAbilityFor from "../utils/abilities.js";
import { subject } from "@casl/ability";

export const rentBook = async (req, res) => {
    const currentUser = req.user;
    const id = parseInt(req.params.id)
    const { quantity } = req.body;

    try {
        const book = await prisma.book.findUnique({
            where: { id },
        });

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        if (book.quantity < quantity) {
            return res.status(400).json({
                message: "There are not enough books available",
            });
        }

        const owner = await prisma.user.findUnique({
            where: { id: book.ownerId },
        });

        if (book.status !== BookStatus.APPROVED || owner.status !== UserStatus.APPROVED) {
            return res.status(400).json({ error: "Book or owner not approved" });
        }

        const rentPrice = book.rentPrice * quantity;
        const returnDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

        // Create the rental record
        const newRental = await prisma.rental.create({
            data: {
                renterId: currentUser.id,
                rentPrice,
                returnDate,
                quantity,
                bookId: id,
            }
        });


        if (newRental) {
            //update book quantity
            const updatedBook = await prisma.book.update({
                where: { id },
                data: {
                    quantity: {
                        decrement: newRental.quantity,
                    },
                },
            });


            // Update the owner's wallet
            await prisma.user.update({
                where: { id: book.ownerId },
                data: {
                    wallet: {
                        increment: rentPrice,
                    },
                },
            });
        }

        res.status(201).json({ message: "Rental created successfully", rental: newRental });

    } catch (err) {
        // Handle validation errors
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: "Invalid request data", errors: err.errors });
        }
        console.log(err);
        res.status(500).json({ message: "Failed to create rental" });
    }
};


export const returnBook = async (req, res) => {
    const id = parseInt(req.params.id)
    const currentUser = req.user;

    try {
        const rental = await prisma.rental.findUnique({
            where: { id },
        });

        if (!rental) {
            return res.status(404).json({ error: "Rental not found" });
        }

        const ability = defineAbilityFor(currentUser);
        const isAllowed = ability.can('return', subject('Book', rental));
        if (!isAllowed) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to return this book." });
        }

        const { status } = rental

        if (status !== RentStatus.BORROWED) {
            return res.status(400).json({ error: "Invalid operation" });
        }

        const updatedRental = await prisma.rental.update({
            where: { id },
            data: {
                status: RentStatus.RETURNED,
            },
        });

        //update book quantity
        const book = await prisma.book.findUnique({
            where: { id: rental.bookId },
        });

        if (book) {
            const updatedBook = await prisma.book.update({
                where: { id: rental.bookId },
                data: {
                    wallet: {
                        increment: rental.quantity,
                    },

                },
            });
        }
        res.json(rental);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message });
    }
};