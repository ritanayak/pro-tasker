import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    const task = await Task.create ({
        ... req.body,
        Project: req.params.ProjectId
    });
    res.json(task);
};

export const getTasks = async (req, res) => {
    const tasks = await Task.find ({ project: req.params.ProjectId});
    res.json(tasks);
};