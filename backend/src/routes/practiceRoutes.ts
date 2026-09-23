// TechnicalReview & Practices

import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import {savePractice, getPractices, getTechnicalReview, deletePractice,} from "../controllers/modelControllers/practiceController";

const router = Router();

router.use(authenticateUser);

router.post("/projects/:projectId/practices", savePractice);
router.get("/projects/:projectId/practices", getPractices);
router.get("/projects/:projectId/review", getTechnicalReview);
router.delete("/practices/:id", deletePractice);

export default router;