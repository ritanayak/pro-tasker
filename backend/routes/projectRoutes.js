import express from 'express';
import { protect } from '../middleware/auth.js';
import { createProject, getProjects, deleteProject } from '../controllers/projectController.js'; 
import taskRoutes from './taskRoutes.js';


const router = express.Router();

router.use(protect);
router.post("/", createProject);
router.get("/", getProjects);
router.delete("/:id", protect, deleteProject);
router.use('/:projectId/tasks', taskRoutes);

export default router;