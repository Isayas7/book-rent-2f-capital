import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addBook,
  changeBookStatus,
  deleteBook,
  getBooks,
  getAllBooks,
  getOwnBooks,
  updateBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/create", verifyToken, addBook);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);
router.get("/", verifyToken, getBooks);
router.get("/ownBooks", verifyToken, getOwnBooks);
router.get("/allBooks", verifyToken, getAllBooks);

router.put("/status/:id", verifyToken, changeBookStatus);




export default router;
