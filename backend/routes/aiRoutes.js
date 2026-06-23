import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { classifyIntent } from "../controllers/aiController.js";

const router = express.Router();

router.post("/intent", authMiddleware, classifyIntent);

export default router;