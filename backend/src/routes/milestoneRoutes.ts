import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import {createMilestone,getMilestones,updateMilestone,deleteMilestone} from "../controllers/modelControllers/milestoneController";

const router = Router();

router.use(authenticateUser);

router.post("/projects/:projectId/milestones", createMilestone);
router.get("/projects/:projectId/milestones",getMilestones);
router.patch("/milestones/:id", updateMilestone);
router.delete("/milestones/:id", deleteMilestone);

export default router;