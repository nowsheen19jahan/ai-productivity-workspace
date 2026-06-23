import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

connectDB();

//Middleware
app.use(express.json())

const logger = (req, res, next) => {
    console.log("Middleware Executed");
    console.log(req.method);
    console.log(req.url);
    next();
};

app.use(logger);

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);
app.use("/settings", settingsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/ai", aiRoutes);

// Home 
app.get("/", (req, res) => {
    res.send("AI Workspace Backend Running");
});

// Running Backend
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
}); 