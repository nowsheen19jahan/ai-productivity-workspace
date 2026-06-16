import express from "express";
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from "../controllers/noteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ownershipMiddleware } from "../middleware/ownershipMiddleware.js";
import Note from "../models/Note.js";

const router = express.Router();

router.get("/", authMiddleware, getNotes);
router.get("/:id", authMiddleware, ownershipMiddleware(Note), getNoteById);
router.post("/", authMiddleware, createNote);
router.patch("/:id", authMiddleware, ownershipMiddleware(Note), updateNote);
router.delete("/:id", authMiddleware, ownershipMiddleware(Note), deleteNote);

export default router;

