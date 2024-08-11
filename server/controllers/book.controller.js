import prisma from "../utils/connect.js";
import jwt from "jsonwebtoken";
import { createBookSchema, updateBookSchema } from "../utils/validationSchema.js";
import { z } from "zod";
import defineAbilityFor from "../utils/abilities.js";
import { subject } from "@casl/ability";

export const addBook = async (req, res) => {
  const currentUser = req.user;

  const ability = defineAbilityFor(currentUser);
  const isAllowed = ability.can("upload", "Book")

  if (!isAllowed) {
    return res.status(403).json({ message: "Forbidden: You do not have permission to upload books." });
  }

  try {
    const validatedData = createBookSchema.parse(req.body);

    const newBook = await prisma.book.create({
      data: {
        ownerId: currentUser.id,
        ...validatedData,
      },
    });

    res.status(201).json({ message: "Book created successfully", book: newBook });

  } catch (err) {
    // Handle validation errors
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid request data", errors: err.errors });
    }
    res.status(500).json({ message: "Failed to create book" });
  }
};



export const updateBook = async (req, res) => {
  const id = parseInt(req.params.id)
  const currentUser = req.user

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const ability = defineAbilityFor(currentUser);
    const isAllowed = ability.can('update', subject('Book', book));

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to update this book." });
    }


    const validatedData = updateBookSchema.parse(req.body);

    const updatedBook = await prisma.book.update({
      where: { id },
      data: validatedData,
    });
    res.status(201).json({ message: "Book updated successfully" });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid request data", errors: err.errors });
    }
    res.status(500).json({ message: "Failed to update books" });
  }

};

export const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id)
  const currentUser = req.user;

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    const ability = defineAbilityFor(currentUser);
    const isAllowed = ability.can('delete', subject('Book', book));

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to delete this book." });
    }


    await prisma.book.delete({
      where: { id },
    });

    res.status(200).json({ message: "Book deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete book" });
  }
};


export const getOwnBooks = async (req, res) => {
  const currentUser = req.user;

  try {

    const ability = defineAbilityFor(currentUser);
    const isAllowed = ability.can('get', "OwnBook");

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to get this book." });
    }

    const books = await prisma.book.findMany({
      where: {
        ownerId: currentUser.id
      },
    });
    res.status(200).json(books);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: "Failed to get books" });
  }
};


export const getBooks = async (req, res) => {
  const currentUser = req.user;
  try {

    const ability = defineAbilityFor(currentUser);
    const isAllowed = ability.can("get", "Books");

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to get Books list." });
    }

    const booksList = await prisma.book.findMany();
    res.status(200).json(ownersList);
  } catch (err) {
    res.status(500).json({ message: "Failed to get Book list " });
  }
};


export const BookStatus = async (req, res) => {
  const currentUser = req.user

  const id = parseInt(req.params.id)
  const { status } = req.body

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }

    const ability = defineAbilityFor(currentUser);
    const isAllowed = ability.can("change", "bookStatus")

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to change book status." });
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


export const getBook = async (req, res) => {
  const id = req.params.id;
  const currentUser = req.user;

  try {
    const ability = defineAbilityFor(currentUser);
    const isAllowed = ability.can('get', "OwnBook");

    if (!isAllowed) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to get this book." });
    }

    const book = await prisma.book.findUnique({
      where: { id },
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to get book" });
  }
};