import { Router } from "express";
import { predictRisk } from "../controllers/mlController/mlController";

const router = Router();

router.get("/projects/:projectId/risk", predictRisk);

export default router;