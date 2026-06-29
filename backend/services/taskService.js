// Retrieve Task Data
import Task from "../models/Task.js";

export const getPendingTasks = async (userId) => {

    return await Task.find({
        user: userId,
        completed: false
    }).sort({
        createdAt: 1
    });

};

export const getCompletedTasks = async (userId) => {

    return await Task.find({
        user: userId,
        completed: true
    }).sort({
        createdAt: 1
    });
};

export const getRecommendedTask = async (userId) => {

    return await Task.findOne({
        user: userId,
        completed: false
    }).sort({
        createdAt: 1
    });

};

