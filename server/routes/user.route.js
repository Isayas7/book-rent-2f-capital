import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
    ownerStatus,
    deleteUser,
    getUser,
    getOwners,
    updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/ownerList", verifyToken, getOwners);
router.put("/status/:id", verifyToken, ownerStatus);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;
