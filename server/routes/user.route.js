import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
    ownerStatus,
    getOwners,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/ownerList", verifyToken, getOwners);
router.put("/status/:id", verifyToken, ownerStatus);


export default router;
