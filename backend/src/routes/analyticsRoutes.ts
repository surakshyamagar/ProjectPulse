import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import { getProjectAnalytics } from "../controllers/nodeCalculations/analyticsController";

const router = Router();

router.use(authenticateUser);

router.get("/projects/:projectId/analytics", getProjectAnalytics);

export default router;