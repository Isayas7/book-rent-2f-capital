import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.book("/", verifyToken, addBook);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;
