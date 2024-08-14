import { PrismaClient, UserRole, UserStatus, BookStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const seedData = async () => {
    try {
        // Clear existing data
        await prisma.rental.deleteMany({});
        await prisma.book.deleteMany({});
        await prisma.user.deleteMany({});

        // Create Users
        const users = [];
        for (let i = 0; i < 10; i++) {
            users.push({
                username: faker.internet.userName(),
                phoneNumber: faker.phone.number(),
                email: faker.internet.email(),
                password: "1234",
                location: faker.helpers.arrayElement([
                    "Addis Ababa",
                    "Adama",
                    "Burayuu",
                    "Gondar",
                    "Hawassa",
                ]),
                status: faker.helpers.arrayElement([
                    UserStatus.APPROVED,
                    UserStatus.PENDING, // Add more statuses if needed
                ]),
                role: faker.helpers.arrayElement([
                    UserRole.ADMIN,
                    UserRole.CUSTOMER,
                    UserRole.OWNER,
                ]),
            });
        }

        // Create users individually and keep track of them
        const createdUsers = [];
        for (const user of users) {
            const createdUser = await prisma.user.create({
                data: user,
            });
            createdUsers.push(createdUser);
        }

        // Create Books
        const books = [];
        for (let i = 0; i < 20; i++) {
            const approvedOwners = createdUsers.filter(user => user.role === UserRole.OWNER && user.status === UserStatus.APPROVED);
            const randomOwner = faker.helpers.arrayElement(approvedOwners);
            if (randomOwner) {
                books.push({
                    ownerId: randomOwner.id,
                    bookName: faker.lorem.words(3),
                    author: faker.person.firstName(),
                    category: faker.helpers.arrayElement([
                        "Fiction",
                        "Fantasy",
                        "Science",
                        "Business",
                    ]),
                    quantity: faker.number.int({ min: 1, max: 10 }),
                    rentPrice: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
                    coverPhotoUrl: faker.image.url(),
                    status: faker.helpers.arrayElement([
                        BookStatus.APPROVED,
                        BookStatus.PENDING, // Add more statuses if needed
                    ]),
                });
            }
        }
        const createdBooks = [];
        for (const book of books) {
            const createdBook = await prisma.book.create({
                data: book,
            });
            createdBooks.push(createdBook);
        }

        // Create Rentals
        const rentals = [];
        for (let i = 0; i < 15; i++) {
            const approvedBooks = createdBooks.filter(book => book.status === BookStatus.APPROVED);
            const randomBook = faker.helpers.arrayElement(approvedBooks);
            const renters = createdUsers.filter(user => user.role === UserRole.CUSTOMER);
            const randomRenter = faker.helpers.arrayElement(renters);
            if (randomBook && randomRenter) {
                rentals.push({
                    renterId: randomRenter.id,
                    bookId: randomBook.id,
                    rentPrice: randomBook.rentPrice,
                    returnDate: faker.date.future(),
                    quantity: faker.number.int({
                        min: 1,
                        max: randomBook.quantity,
                    }),
                });
            }
        }
        for (const rental of rentals) {
            await prisma.rental.create({
                data: rental,
            });
        }

        console.log("Seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
};

seedData();
