import express from "express";
import { rentBook, returnBook } from "../controllers/rent.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/rent/:id", verifyToken, rentBook);
router.put("/return/:id", verifyToken, returnBook);

export default router;
