import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import {createRequirement, getRequirements, updateRequirement, deleteRequirement,} from "../controllers/modelControllers/requirementController";

const router = Router();

router.use(authenticateUser);

router.post("/projects/:projectId/requirements", createRequirement);
router.get("/projects/:projectId/requirements", getRequirements);
router.patch("/requirements/:id", updateRequirement);
router.delete("/requirements/:id", deleteRequirement);

export default router;