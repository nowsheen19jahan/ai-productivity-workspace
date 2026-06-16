import Note from "../models/Note.js";

// GET - View Note
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Notes fetched successfully",
            notes
        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }

};

// GET - Note by ID
export const getNoteById = async (req, res) => {
    try {
        const note = req.resource;
        return res.status(200).json({
            message: "Note fetched successfully",
            note
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// POST - Create Note
export const createNote = async (req, res) => {
    try {

        const {
            title,
            content,
            tags,
            color,
            pinned
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }

        let processedTags = [];

        if (
            tags !== undefined &&
            !Array.isArray(tags)
        ) {
            return res.status(400).json({
                message: "Tags must be an array"
            });
        }
        if (tags) {
            processedTags = tags
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            processedTags = [
                ...new Set(processedTags)
            ];


            if (processedTags.length > 8) {
                return res.status(400).json({
                    message: "Maximum 8 tags allowed"
                });
            }
        }


        const note = await Note.create({
            title: title.trim(),
            content,
            tags: processedTags,
            color,
            pinned,
            user: req.user.userId
        });

        return res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// PATCH - Update Note
export const updateNote = async (req, res) => {
    try {
        const note = req.resource;

        const {
            title,
            content,
            tags,
            color,
            pinned
        } = req.body;

        if (
            title === undefined &&
            content === undefined &&
            tags === undefined &&
            color === undefined &&
            pinned === undefined
        ) {
            return res.status(400).json({
                message: "At least one field is required"

            });
        }
        if (title !== undefined && !title.trim()) {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }
        if (title !== undefined) {
            note.title = title.trim();
        }


        if (content !== undefined) {
            note.content = content;
        }

        if (
            tags !== undefined &&
            !Array.isArray(tags)
        ) {
            return res.status(400).json({
                message: "Tags must be an array"
            });
        }

        if (tags !== undefined) {

            let processedTags = tags
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            processedTags = [
                ...new Set(processedTags)
            ];

            if (processedTags.length > 8) {
                return res.status(400).json({
                    message: "Maximum 8 tags allowed"
                });
            }

            note.tags = processedTags;
        }

        if (color !== undefined) {
            note.color = color;
        }
        if (pinned !== undefined) {
            note.pinned = pinned;
        }

        await note.save();



        return res.status(200).json({
            message: "Note updated successfully",
            note
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// DELETE - delete note
export const deleteNote = async (req, res) => {
    try {
        const note = req.resource;

        await note.deleteOne();

        return res.status(200).json({
            message: "Note deleted successfully"
        });

    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};