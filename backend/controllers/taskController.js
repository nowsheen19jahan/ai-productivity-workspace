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
        return res.status(200).json(req.task);
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
        req.task.title = req.body.title;
        await req.task.save();

        return res.status(200).json({
            message: "Task Updated",
            task: req.task
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
        await req.task.deleteOne();

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