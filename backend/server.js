import express from "express";

const app = express();

let tasks = [];
let id = 1;

//Middleware
app.use(express.json())


// Home 
app.get("/", (req, res) => {
    res.send("AI Workspace Backend Running");
});


// Get All tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
})


// Get task by id
app.get("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find(t => t.id == taskId);
    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }
    res.json(task);
});


// post a task
app.post("/tasks", (req, res) => {
    const task = {
        id: id++,
        title: req.body.title
    };

    tasks.push(task)

    res.status(201).json({
        message: 'Task Created',
        task: task
    });
});


// Delete a Task
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const taskExists = tasks.find(t => t.id == id);

    if (!taskExists) {
        return res.status(404).json({
            message: "Task not found"
        });
    }
    tasks = tasks.filter(t => t.id != id);
    res.json({
        message: "Task Deleted Successfully"
    });
});


// Updating a task
app.patch("/tasks/:id",(req,res)=>{
    const id=Number(req.params.id);
    const task=tasks.find(t=> t.id==id);

    if (!task){
        return res.status(404).json({
            message:"Task not found"
        });
    }
    if(req.body.title){
        task.title=req.body.title;
    }
    res.json({
        message:"Task Updated",task
    });
});

// Running Backend
app.listen(5000, () => {
    console.log("Server runinng on port 5000");
}); 