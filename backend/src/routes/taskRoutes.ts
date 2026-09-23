import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import {createTask, getTasks, updateTask, deleteTask,} from "../controllers/modelControllers/taskController";

const router = Router();

router.use(authenticateUser);

router.post("/milestones/:milestoneId/tasks", createTask);
router.get("/milestones/:milestoneId/tasks", getTasks);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;