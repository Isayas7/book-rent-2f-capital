import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addBook,
  BookStatus,
  deleteBook,
  getBook,
  getBooks,
  getOwnBooks,
  updateBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", verifyToken, addBook);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);
router.get("/", verifyToken, getOwnBooks);
router.get("/:id", verifyToken, getBooks);
router.get("status/:id", verifyToken, BookStatus);
router.get("/:id", getBook);




export default router;
