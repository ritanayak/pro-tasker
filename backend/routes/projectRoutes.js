import express from 'express';
import { protect } from '../middleware/auth.js';
import { createProject, getProjects } from '../controllers/projectController.js'; 

const router = express.Router();

router.use(protect);
router.post("/", createProject);
router.get("/", getProjects);

export default router;