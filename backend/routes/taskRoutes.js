import express from 'express';
import { protect } from '../middleware/auth.js';
import { createTask, getTasks } from '../controllers/taskController.js';

const router = express.Router({ mergeParams: true});

router.use(protect);
router.post('/', createTask);
router.get('/', getTasks);

export default router;