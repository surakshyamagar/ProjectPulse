import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import { createIssue, deleteIssue, getIssues, updateIssue } from "../controllers/modelControllers/issueController";

const router = Router();

router.use(authenticateUser);
router.post("/projects/:projectId/issues", createIssue);
router.get("/projects/:projectId/issues", getIssues);
router.patch("/issues/:id", updateIssue);
router.delete("/issues/:id", deleteIssue);

export default router;