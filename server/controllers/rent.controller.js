import prisma from "../utils/connect.js";
import { z } from "zod";
import { UserStatus, RentStatus, BookStatus } from "@prisma/client";
import { getEndOfMonth, getEndOfPreviousMonth, getStartOfMonth, getStartOfPreviousMonth } from "../utils/date.js";
import { createAbility } from "../casl/createAbility.js";
import { findBy } from "../casl/findUser.js";

export const rentBook = async (req, res) => {
    const currentUser = req.user;
    const bookId = parseInt(req.params.id)
    const { quantity } = req.body;

    try {
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });


        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0",
            });
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
            return res.status(400).json({ message: "Book or owner not approved." });
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
                bookId: bookId,
            }
        });


        if (newRental) {
            // Calculate the remaining quantity
            const remainingQuantity = book.quantity - quantity;

            console.log("remainingQuantity", remainingQuantity);

            // Update book quantity and isAvailable status
            const updatedBook = await prisma.book.update({
                where: { id: bookId },
                data: {
                    quantity: remainingQuantity,
                    isAvailable: remainingQuantity > 0 ? true : false,
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

        res.status(201).json({ message: "Rental created successfully", newRental });

    } catch (err) {
        // Handle validation errors
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: "Invalid request data", errors: err.errors });
        }
        res.status(500).json({ message: "Failed to create rental" });
    }
};




export const returnBook = async (req, res) => {
    const rentalId = parseInt(req.params.id)
    const currentUser = req.user;

    try {
        const rental = await prisma.rental.findUnique({
            where: { id: rentalId },
        });

        if (!rental) {
            return res.status(404).json({ error: "Rental not found" });
        }

        const { status } = rental

        if (status !== RentStatus.BORROWED) {
            return res.status(400).json({ error: "Invalid operation" });
        }

        const updatedRental = await prisma.rental.update({
            where: {
                id: rentalId,
                renterId: currentUser.id
            },
            data: {
                status: RentStatus.RETURNED,
            },
        });


        const book = await prisma.book.findUnique({
            where: { id: rental.bookId },
        });



        if (book) {
            // Calculate the current quantity
            const currentQuantity = book.quantity + quantity;

            // Update book quantity and isAvailable status
            const updatedBook = await prisma.book.update({
                where: { id: rental.bookId },
                data: {
                    quantity: currentQuantity,
                    isAvailable: true,
                },
            });
        }

        res.json(rental);
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: error.message });
    }
};


export const ownerRentalStatics = async (req, res) => {
    const currentUser = req.user;

    if (!currentUser) {
        return res.status(400).json({ error: 'Owner ID is required' });
    }



    try {
        const now = new Date();
        const startOfCurrentMonth = getStartOfMonth(now);
        const endOfCurrentMonth = getEndOfMonth(now);
        const startOfPreviousMonth = getStartOfPreviousMonth(now);
        const endOfPreviousMonth = getEndOfPreviousMonth(now);

        // Fetch revenue for the current month for the owner's books
        const currentMonthRevenue = await prisma.rental.aggregate({
            _sum: {
                rentPrice: true
            },
            where: {
                transactionDate: {
                    gte: startOfCurrentMonth,
                    lte: endOfCurrentMonth
                },
                book: {
                    ownerId: Number(currentUser.id)
                }
            }
        });

        // Fetch revenue for the previous month for the owner's books
        const previousMonthRevenue = await prisma.rental.aggregate({
            _sum: {
                rentPrice: true
            },
            where: {
                transactionDate: {
                    gte: startOfPreviousMonth,
                    lte: endOfPreviousMonth
                },
                book: {
                    ownerId: Number(currentUser.id) // Filter by owner's books
                }
            }
        });

        const currentMonthTotal = currentMonthRevenue._sum.rentPrice || 0;
        const previousMonthTotal = previousMonthRevenue._sum.rentPrice || 0;

        // Calculate percentage change
        let percentageChange = 0;
        if (previousMonthTotal > 0) {
            percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
        }

        // Determine if revenue is increasing or decreasing
        const trend = percentageChange > 0 ? 'increasing' : percentageChange < 0 ? 'decreasing' : 'no change';

        // Send the results in the response
        res.json({
            currentMonthTotal,
            previousMonthTotal,
            percentageChange,
            trend
        });
    } catch (error) {
        console.error('Error fetching rental data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const allRentalStatics = async (req, res) => {


    const currentUser = req.user;

    if (!currentUser) {
        return res.status(400).json({ error: 'user ID is required' });
    }


    const user = await findBy({ id: currentUser.id });

    const ability = createAbility(user.permissions);

    const isAllowed = ability.can("View", 'Book',)

    if (!isAllowed) {
        return res.status(403).json({ message: "Forbidden: You do not have permission to get revenue data." });
    }

    try {
        const now = new Date();
        const startOfCurrentMonth = getStartOfMonth(now);
        const endOfCurrentMonth = getEndOfMonth(now);
        const startOfPreviousMonth = getStartOfPreviousMonth(now);
        const endOfPreviousMonth = getEndOfPreviousMonth(now);

        // Fetch revenue for the current month
        const currentMonthRevenue = await prisma.rental.aggregate({
            _sum: {
                rentPrice: true
            },
            where: {
                transactionDate: {
                    gte: startOfCurrentMonth,
                    lte: endOfCurrentMonth
                }
            }
        });

        // Fetch revenue for the previous month
        const previousMonthRevenue = await prisma.rental.aggregate({
            _sum: {
                rentPrice: true
            },
            where: {
                transactionDate: {
                    gte: startOfPreviousMonth,
                    lte: endOfPreviousMonth
                }
            }
        });

        const currentMonthTotal = currentMonthRevenue._sum.rentPrice || 0;
        const previousMonthTotal = previousMonthRevenue._sum.rentPrice || 0;

        // Calculate percentage change
        let percentageChange = 0;
        if (previousMonthTotal > 0) {
            percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
        }

        // Determine if revenue is increasing or decreasing
        const trend = percentageChange > 0 ? 'increasing' : percentageChange < 0 ? 'decreasing' : 'no change';

        // Send the results in the response
        res.json({
            currentMonthTotal,
            previousMonthTotal,
            percentageChange,
            trend
        });
    } catch (error) {
        console.error('Error fetching rental data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};