import express from "express";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getTaskAnalytics,
} from "../controllers/taskController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

// create + get
router.post("/", createTask);
router.get("/", getTasks);

// update status
router.patch("/:taskId/status", updateTaskStatus);

// ✏ full update
router.patch("/:taskId", updateTask);

// 🗑 delete
router.delete("/:taskId", deleteTask);

// analytics
router.get("/analytics", getTaskAnalytics);

export default router;