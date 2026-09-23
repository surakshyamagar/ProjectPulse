import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware";
import { createApiTest, getApiTests } from "../controllers/modelControllers/apiTestController";

const router = Router();

router.use(authenticateUser);

router.post("/projects/:projectId/api-tests", createApiTest);
router.get("/projects/:projectId/api-tests", getApiTests);

export default router;