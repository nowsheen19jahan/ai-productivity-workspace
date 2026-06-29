// Builds AI context for task-related requests
import {
    getPendingTasks,
    getCompletedTasks,
    getRecommendedTask
} from "../services/taskService.js";

export const buildTaskContext = async (
    userId,
    query
) => {

    // Recommendation Request
    if (query.recommendation) {

        const task =
            await getRecommendedTask(userId);

        return {

            type: "recommendation",

            tasks: task
                ? [task]
                : []

        };

    }

    let tasks;

    switch (query.status) {

        case "completed":

            tasks =
                await getCompletedTasks(userId);

            break;

        case "pending":

        default:

            tasks =
                await getPendingTasks(userId);

            break;

    }



    return {

        type:
            query.status ?? "pending",

        tasks:
            tasks.slice(0, 10)

    };

};