import Task from "../models/Task.js";

export const ownershipMiddleware = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: "Task dosen't exist"
            });
        }

        if (task.user.toString() != req.user.userId) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        req.task = task;
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }


};