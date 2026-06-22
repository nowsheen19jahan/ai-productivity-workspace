import Task from "../models/Task.js";

// GET Method
export const getTasks = async (req, res) => {
    try {
        const {
            search,
            completed,
            sort
        } = req.query;

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
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        if (completed !== undefined) {

            if (
                completed !== "true" &&
                completed !== "false"
            ) {
                return res.status(400).json({
                    message:
                        "completed must be true or false"
                });
            }

            query.completed =
                completed === "true";
        }


        const allowedSorts = [
            "newest",
            "oldest",
            "title",
            "completed"
        ];

        let sortOption = {
            createdAt: -1
        };

        if (
            sort !== undefined &&
            !allowedSorts.includes(sort)
        ) {
            return res.status(400).json({
                message: "Invalid sort option"
            });
        }

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

        if (sort === "completed") {
            sortOption = {
                completed: 1,
                createdAt: -1
            };
        }

        const totalTasks =
            await Task.countDocuments(query);

        const totalPages =
            Math.ceil(totalTasks / limit);

        const hasNextPage =
            page < totalPages;

        const hasPreviousPage =
            page > 1;


        const tasks = await Task.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Tasks fetched successfully",
            pagination: {
                currentPage: page,
                totalPages,
                totalTasks,
                limit,
                hasNextPage,
                hasPreviousPage
            },
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// POST Method
export const createTask = async (req, res) => {
    try {

        const { title } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Title cannot be empty"
            });
        }
        if (title.trim().length > 50) {
            return res.status(400).json({
                message:
                    "Title cannot exceed 50 characters"
            });
        }
        const task = await Task.create({
            title: title.trim(),
            user: req.user.userId
        });

        res.status(201).json({
            message: "Task Created",
            task
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

// GET by ID method
export const getTaskById = async (req, res) => {
    try {
        const task = req.resource;

        return res.status(200).json({
            message: "Task fetched successfully",
            task
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// PATCH Method
export const updateTask = async (req, res) => {
    try {
        const task = req.resource;

        const {
            title,
            completed
        } = req.body;

        if (
            title === undefined &&
            completed === undefined
        ) {
            return res.status(400).json({
                message:
                    "At least one field is required"
            });
        }

        if (
            title !== undefined &&
            !title.trim()
        ) {
            return res.status(400).json({
                message:
                    "Title cannot be empty"
            });
        }

        if (
            completed !== undefined &&
            typeof completed !== "boolean"
        ) {
            return res.status(400).json({
                message:
                    "Completed must be a boolean"
            });
        }

        if (title !== undefined) {
            task.title = title.trim();
        }

        if (completed !== undefined) {
            task.completed = completed;
        }

        await task.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// DELETE Method
export const deleteTask = async (req, res) => {
    try {
        const task = req.resource;

        await task.deleteOne();

        return res.status(200).json({
            message: "Task Deleted Successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};