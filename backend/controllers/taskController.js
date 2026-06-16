import Task from "../models/Task.js";

// GET Method
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.userId
        });

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
            title: req.body.title,
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

        task.title = req.body.title;
        await task.save();

        return res.status(200).json({
            message: "Task Updated",
            task
        });
    }
    catch (error) {
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