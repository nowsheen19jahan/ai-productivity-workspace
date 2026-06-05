import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Task from "./models/Task.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

connectDB();

//Middleware
app.use(express.json())

// Routes
app.use("/tasks", taskRoutes);

// Home 
app.get("/", (req, res) => {
    res.send("AI Workspace Backend Running");
});

// Running Backend
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
}); 