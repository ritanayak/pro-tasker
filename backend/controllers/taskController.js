import Task from "../models/Task.js";


//  CREATE TASK
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      status: req.body.status || "Pending",
      priority: req.body.priority || "Low",
      dueDate: req.body.dueDate || null,
      project: req.params.projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  GET TASKS (SEARCH + FILTER)
export const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    let query = { project: req.params.projectId };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  UPDATE STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status: req.body.status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  UPDATE TASK (TITLE + PRIORITY + DUE DATE)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
      },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ANALYTICS
export const getTaskAnalytics = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });

    const analytics = {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "Pending").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      done: tasks.filter((t) => t.status === "Done").length,
      highPriority: tasks.filter((t) => t.priority === "High").length,
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};