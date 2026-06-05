import Task from "../models/Task.js";

// GET Method
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// POST Method
export const createTask = async (req, res) => {
    try {

        const task = await Task.create({
            title: req.body.title
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

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// PATCH Method
export const updateTask = async (req, res) => {
    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task Updated",
            task
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

// DELETE Method
export const deleteTask = async (req, res) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task Deleted Successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};