import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

import ProtectedRoute from "../components/ProtectedRoute";

import HomePage from "../pages/MainPage/HomePage";

import Projects from "../pages/projects/Projects";
import ProjectDetails from "../pages/projects/ProjectDetails";
import CreateProject from "../pages/projects/CreateProject";

import Requirements from "../pages/projects/Requirements";
import Tasks from "../pages/projects/Tasks";
import Milestones from "../pages/projects/Milestones";
import Issues from "../pages/projects/Issues";
import ApiTests from "../pages/projects/ApiTests";
import Analytics from "../pages/projects/Analytics";
import TechnicalReview from "../pages/projects/TechnicalReview";
import Recommendations from "../pages/projects/Recommendations";

// ML
import Risk from "../pages/projects/Risk";
import ProjectLayout from "../components/ProjectLayout";
import Dashboard from "../pages/Auth/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Projects */}
                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects/create"
                    element={
                        <ProtectedRoute>
                            <CreateProject />
                        </ProtectedRoute>
                    }
                />

                {/* Project Workspace */}
                <Route
                    element={
                        <ProtectedRoute>
                            <ProjectLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Overview */}
                    <Route
                        path="/projects/:id"
                        element={<ProjectDetails />}
                    />

                    {/* Development */}
                    <Route
                        path="/projects/:projectId/requirements"
                        element={<Requirements />}
                    />

                    <Route
                        path="/projects/:projectId/milestones"
                        element={<Milestones />}
                    />

                    <Route
                        path="/projects/:projectId/issues"
                        element={<Issues />}
                    />

                    <Route
                        path="/projects/:projectId/api-tests"
                        element={<ApiTests />}
                    />

                    {/* Insights */}
                    <Route
                        path="/projects/:projectId/analytics"
                        element={<Analytics />}
                    />

                    <Route
                        path="/projects/:projectId/review"
                        element={<TechnicalReview />}
                    />

                    <Route
                        path="/projects/:projectId/recommendations"
                        element={<Recommendations />}
                    />

                    <Route
                        path="/projects/:id/risk"
                        element={<Risk />}
                    />
                </Route>

                {/* Tasks remain milestone-specific */}
                <Route
                    path="/milestones/:milestoneId/tasks"
                    element={
                        <ProtectedRoute>
                            <Tasks />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;