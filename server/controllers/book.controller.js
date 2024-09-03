import prisma from "../utils/connect.js";
import { createBookSchema, updateBookSchema } from "../utils/validationSchema.js";
import { z } from "zod";
import { findBy } from "../casl/findUser.js";
import { subject } from "@casl/ability";
import { UserStatus, BookStatus } from "@prisma/client";
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';
import { createAbility } from "../casl/createAbility.js";
import { parseFilters } from "../helper/generate.query.js";


export const addBook = async (req, res) => {
  const currentUser = req.user;


  const user = await findBy({ id: currentUser.id });

  const ability = createAbility(user.permissions);

  const isAllowed = ability.can("Create", 'Book')

  if (!isAllowed) {
    return res.status(403).json({ message: "Forbidden: You do not have permission to upload books." });
  }

  try {
    const { bookName, author, category, quantity, rentPrice } = req.body;

    const dataForValidation = { bookName, author, category, quantity: parseInt(quantity), rentPrice: parseFloat(rentPrice) }
    const validatedData = createBookSchema.parse(dataForValidation);


    let coverUrl = null;


    const book = await prisma.book.findUnique({
      where: { bookName },
    });

    if (book) {
      return res.status(403).json({ message: "The Book alredy exist." });
    }

    // Upload cover image to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: 'books' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        // Create a readable stream from the buffer
        const bufferStream = streamifier.createReadStream(req.file.buffer);
        bufferStream.pipe(uploadStream);
      });
      coverUrl = result.secure_url;
    }

    // Save 
    const newBook = await prisma.book.create({
      data: {
        bookName,
        ownerId: currentUser.id,
        author: author,
        category: category,
        quantity: parseInt(quantity, 10),
        rentPrice: parseFloat(rentPrice),
        coverPhotoUrl: coverUrl,
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid request data" });
    }
    res.status(500).json({ error: 'An error occurred while uploading the book' });
  }
};




export const updateBook = async (req, res) => {
  const id = parseInt(req.params.id)
  const currentUser = req.user

  try {

    const { bookName, author, category, quantity, rentPrice } = req.body;

    const dataForValidation = { bookName, author, category, quantity: parseInt(quantity), rentPrice: parseFloat(rentPrice) }
    const validatedData = updateBookSchema.parse(dataForValidation);



    let coverUrl = null;

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }


    const user = await findBy({ id: currentUser.id });

    const ability = createAbility(user.permissions);

    const isAllowed = ability.can("Edit", subject('Book', book))

    if (!isAllowed) {
      return res.status(403).json({ message: "You are not allowed to edit this book" });
    }

    // Upload cover image to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: 'books' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        // Create a readable stream from the buffer
        const bufferStream = streamifier.createReadStream(req.file.buffer);
        bufferStream.pipe(uploadStream);
      });
      coverUrl = result.secure_url;
    }

    if (coverUrl) {
      validatedData.coverPhotoUrl = coverUrl
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: validatedData,
    });
    res.status(201).json({ message: "Book updated successfully", updatedBook });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err
      });
    }

    res.status(500).json({ message: err });
  }

};

export const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id)
  const currentUser = req.user;

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await findBy({ id: currentUser.id });

    const ability = createAbility(user.permissions);

    const isAllowed = ability.can("Delete", subject('Book', book))


    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to delete this book." });
    }


    // frist  delete related rental 
    await prisma.rental.deleteMany({
      where: { bookId: id },
    });




    await prisma.book.delete({
      where: { id },
    });

    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete book" });
  }
};


export const getOwnSingleBook = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const currentUser = req.user;

  try {


    const ownSingleBook = await prisma.book.findUnique({
      where: { id, ownerId: currentUser.id },
    });

    if (!ownSingleBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }


    res.status(200).json({ data: ownSingleBook });
  } catch (err) {
    console.error('Error fetching single book:', err);
    res.status(500).json({ message: 'Failed to get the book.' });
  }
};


export const getOwnBooks = async (req, res) => {
  const currentUser = req.user;


  const filterParams = JSON.parse(req.query.filter || '[]');
  let whereClause = {}

  if (filterParams.length > 0) {
    whereClause = parseFilters(filterParams, 'Book');
  }

  if (whereClause === null) {
    return res.status(200).json({ data: [] });
  }

  try {

    const options = {
      where: {
        ownerId: currentUser.id,
        ...whereClause,
      },
      include: {
        rentals: {
          select: {
            status: true,
            rentPrice: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    };

    // Execute the query
    const books = await prisma.book.findMany(options);

    res.status(200).json({ data: books });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get books" });
  }
};



export const getAllBooks = async (req, res) => {
  const currentUser = req.user;

  try {
    const user = await findBy({ id: currentUser.id });

    const ability = createAbility(user.permissions);

    if (!ability.can("View", 'Book')) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to get all books." });
    }


    const filterParams = JSON.parse(req.query.filter || '[]');
    let whereClause = {}

    if (filterParams.length > 0) {
      whereClause = parseFilters(filterParams, 'Book');
    }

    if (whereClause === null) {
      return res.status(200).json({ data: [] });
    }

    const options = {
      where: whereClause,
      include: {
        owner: {
          select: {
            username: true,
            location: true,
            email: true
          },
        },
        rentals: {
          select: {
            status: true,
            rentPrice: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    };

    const books = await prisma.book.findMany(options);
    res.status(200).json({ data: books });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get Book list" });
  }
};




export const getBooks = async (req, res) => {
  const currentUser = req.user;

  const user = await findBy({ id: currentUser.id });

  const ability = createAbility(user.permissions);

  const isAllowed = ability.can("View", 'Book')



  if (!isAllowed) {
    return res.status(403).json({ message: "Forbidden: You do not have permission to get books." });
  }

  try {
    const filters = {};
    let userIds;

    // First find user those their status  APPROVED
    const users = await prisma.user.findMany({
      where: {
        status: UserStatus.APPROVED
      },
    });

    userIds = users.map(user => user.id);


    if (userIds) {
      filters.ownerId = { in: userIds };
    }

    const booksList = await prisma.book.findMany({
      where: {
        status: BookStatus.APPROVED,
        isAvailable: true,
        ...filters
      },
    });

    res.status(200).json(booksList);
  } catch (err) {
    console.log(err);


    res.status(500).json({ message: "Failed to get Book list" });
  }
};



export const changeBookStatus = async (req, res) => {
  const currentUser = req.user

  const id = parseInt(req.params.id)
  const { status } = req.body

  const user = await findBy({ id: currentUser.id });

  const ability = createAbility(user.permissions);

  const isAllowed = ability.can("Edit", 'Book')


  if (!isAllowed) {
    return res.status(403).json({ message: "Forbidden: You do not have permission to change book status." });
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    const bookStatus = await prisma.book.update({
      where: { id },
      data: { status },
    });

    res.status(201).json({ message: `{Book is ${status} successfully}` });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid request data", errors: err.errors });
    }
    res.status(500).json({ message: "Failed to change book status" });
  }

}


export const allFreeBooks = async (req, res) => {

  const currentUser = req.user

  if (!currentUser) {
    return res.status(400).json({ error: 'Owner ID is required' });
  }

  const user = await findBy({ id: currentUser.id });

  const ability = createAbility(user.permissions);

  const isAllowed = ability.can("View", 'Book')


  if (!isAllowed) {
    return res.status(403).json({ message: "Forbidden: You do not have permission to get the data." });
  }
  try {
    const availableBooks = await prisma.book.findMany({
      where: {
        isAvailable: true,
        rentals: {
          none: {
            returnDate: {
              gte: new Date(),
            }
          }
        }
      },
      select: {
        category: true
      }
    });

    // Group by category and count books
    const categoryCounts = availableBooks.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {});

    res.json(categoryCounts);
  } catch (error) {
    console.error('Error fetching free books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const allFreeBooksForOwner = async (req, res) => {
  const currentUser = req.user

  if (!currentUser) {
    return res.status(400).json({ error: 'Owner ID is required' });
  }




  try {
    // Fetch available books for the specified owner
    const availableBooks = await prisma.book.findMany({
      where: {
        isAvailable: true,
        ownerId: Number(currentUser.id),
        rentals: {
          none: {
            returnDate: {
              gte: new Date(),
            }
          }
        }
      },
      select: {
        category: true
      }
    });

    // Group by category and count books
    const categoryCounts = availableBooks.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {});

    res.json(categoryCounts);
  } catch (error) {
    console.error('Error fetching free books for owner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

