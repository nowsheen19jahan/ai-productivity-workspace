import express from "express";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

const logger = (req, res, next) => {
    console.log("TASK ROUTE HIT:", req.method, req.url);
    next();
};


// Middleware
router.use(logger);


router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTask);
router.delete("/:id",deleteTask);


export default router;