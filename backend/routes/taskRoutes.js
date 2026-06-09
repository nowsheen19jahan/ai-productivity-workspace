import express from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ownershipMiddleware } from "../middleware/ownershipMiddleware.js";

const router = express.Router();

const logger = (req, res, next) => {
    console.log("TASK ROUTE HIT:", req.method, req.url);
    next();
};


// Middleware
router.use(logger);

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.get("/:id", authMiddleware, ownershipMiddleware, getTaskById);
router.patch("/:id", authMiddleware, ownershipMiddleware, updateTask);
router.delete("/:id", authMiddleware, ownershipMiddleware, deleteTask);


export default router;