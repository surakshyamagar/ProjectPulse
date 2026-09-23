import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import {getProjectRecommendations} from "../controllers/nodeCalculations/recommendationController";

const router = Router();

router.use(authenticateUser);

router.get("/projects/:projectId/recommendations", getProjectRecommendations);

export default router;