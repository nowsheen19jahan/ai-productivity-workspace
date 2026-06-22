import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getSettings, updateSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", authMiddleware, getSettings);
router.patch("/", authMiddleware, updateSettings);

export default router;