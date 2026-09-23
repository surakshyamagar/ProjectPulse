import {Router} from "express";
import authenticateUser from "../middleware/authMiddleware";
import { getProfile, loginUser, logoutUser, registerUser } from "../controllers/modelControllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getProfile);
router.post("/logout", logoutUser);

export default router;
