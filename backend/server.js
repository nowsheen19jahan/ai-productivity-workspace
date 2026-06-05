import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Task from "./models/Task.js";

const app = express();

connectDB();

//Middleware
app.use(express.json())


// Home 
app.get("/", (req, res) => {
    res.send("AI Workspace Backend Running");
});


// Get All tasks
app.get("/tasks", async (req, res) => {
    try {

        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// Get task by id
app.get("/tasks/:id", async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// post a task
app.post("/tasks", async (req, res) => {
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
});


// Delete a Task
app.delete("/tasks/:id", async (req, res) => {
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
});

// Updating a task
app.patch("/tasks/:id", async (req, res) => {
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
});

// Running Backend
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
}); 