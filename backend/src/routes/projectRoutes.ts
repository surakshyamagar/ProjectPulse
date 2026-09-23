import { Router } from "express";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/modelControllers/projectController";
import authenticateUser from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateUser, createProject);
router.get("/", authenticateUser, getProjects);
router.get("/:id", authenticateUser, getProject);
router.patch("/:id", authenticateUser, updateProject);
router.delete("/:id", authenticateUser, deleteProject);

export default router;