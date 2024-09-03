import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
    createRoleWithPermissions
} from "../controllers/role.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createRoleWithPermissions);



export default router;
