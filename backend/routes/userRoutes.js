import express from "express";
import { signup, login, getProfile, updateProfile, deleteProfile, updateProfilePassword } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile)
router.patch("/change-password", authMiddleware, updateProfilePassword);
router.delete("/profile", authMiddleware, deleteProfile);

export default router;
