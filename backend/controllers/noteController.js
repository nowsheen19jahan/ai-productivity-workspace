import Note from "../models/Note.js";
import { processTags } from "../utils/processTags.js";

const MAX_TAGS = 8;

// GET - View Note
export const getNotes = async (req, res) => {
    try {
        const {
            search,
            tags,
            pinned,
            sort
        } = req.query;

        let sortOption = {
            createdAt: -1
        };

        if (sort === "oldest") {
            sortOption = {
                createdAt: 1
            };
        }
        if (sort === "title") {
            sortOption = {
                title: 1
            };
        }
        if (sort === "pinned") {
            sortOption = {
                pinned: -1,
                createdAt: -1
            };
        }

        const allowedSorts = [
            "newest",
            "oldest",
            "title",
            "pinned"
        ];

        if (
            sort !== undefined &&
            !allowedSorts.includes(sort)
        ) {
            return res.status(400).json({
                message:
                    "Invalid sort option"
            });
        }

        const page = Math.max(
            Number(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Number(req.query.limit) || 10,
            20
        );

        const skip = (page - 1) * limit;

        const query = {
            user: req.user.userId
        };


        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    content: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }


        if (pinned !== undefined) {
            query.pinned = pinned === "true";
        }


        if (tags) {

            const tagArray = tags
                .split(",")
                .map(tag =>
                    tag.trim().toLowerCase()
                )
                .filter(tag =>
                    tag.length > 0
                );

            query.tags = {
                $in: tagArray
            };
        }


        const totalNotes =
            await Note.countDocuments(query);

        const totalPages =
            Math.ceil(totalNotes / limit);

        const hasNextPage =
            page < totalPages;

        const hasPreviousPage =
            page > 1;


        const notes = await Note.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "Notes fetched successfully",

            pagination: {
                currentPage: page,
                totalPages,
                totalNotes,
                limit,
                hasNextPage,
                hasPreviousPage
            },

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
            processedTags = processTags(tags);

            if (processedTags.length > MAX_TAGS) {
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

            const processedTags = processTags(tags);

            if (processedTags.length > MAX_TAGS) {
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