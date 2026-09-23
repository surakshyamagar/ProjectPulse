import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import requirementRoutes from "./routes/requirementRoutes";
import milestoneRoutes from "./routes/milestoneRoutes";
import taskRoutes from "./routes/taskRoutes";
import issueRoutes from "./routes/issueRoutes";
import apiTestRoutes from "./routes/apiTestRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import practiceRoutes from "./routes/practiceRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import mlRoutes from "./routes/mlRoutes";

// This creates your Express application. creates backend app
const app = express();

// allows your backend to understand JSON request bodies.
app.use(express.json());

app.use(cors
    ({origin: "http://localhost:5173",
        // This allows cookies to be sent between frontend and backend.
        credentials: true,
    })
);

// Add basic security protection to the API.
app.use(helmet());
// Logs requests in development.
app.use(morgan("dev"));
// Allows you to access cookies through: req.cookies
app.use(cookieParser());

app.get("/", (_req, res)=> {
    res.json({
        message: "DevPilot API is working!",
    });
});

// REAl routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", requirementRoutes);
app.use("/api", milestoneRoutes);
app.use("/api", taskRoutes);
app.use("/api", issueRoutes);
app.use("/api", apiTestRoutes);
app.use("/api", analyticsRoutes);
app.use("/api", practiceRoutes);
app.use("/api", recommendationRoutes);

// ML TEST ROUTE
app.use("/api/ml", mlRoutes);


export default app;