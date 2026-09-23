import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Project } from "../../types/project";
import type { AnalyticsResponse } from "../../types/analytics";
import DashboardView from "../Views/authViews/DashboardView";
import { getProjects } from "../../services/projects/projectService";
import { getProjectAnalytics } from "../../services/projects/analyticsService";


interface ProjectAnalytics {
    projectId: number;
    analytics: AnalyticsResponse;
}

function Dashboard() {
    const { user, logout } = useAuth();

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectAnalytics, setProjectAnalytics] = useState<
        ProjectAnalytics[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const projectData = await getProjects();

                if (!mounted) {
                    return;
                }

                setProjects(projectData);

                /*
                 * Load analytics for every project.
                 *
                 * If one project's analytics fails, the dashboard
                 * still remains usable for the other projects.
                 */
                const analyticsResults = await Promise.allSettled(
                    projectData.map(async (project) => {
                        const analytics = await getProjectAnalytics(
                            project.id
                        );

                        return {
                            projectId: project.id,
                            analytics,
                        };
                    })
                );

                if (!mounted) {
                    return;
                }

                const successfulAnalytics: ProjectAnalytics[] = [];

                analyticsResults.forEach((result) => {
                    if (result.status === "fulfilled") {
                        successfulAnalytics.push(result.value);
                    }
                });

                setProjectAnalytics(successfulAnalytics);
            } catch (error: unknown) {
                console.error("Failed to load dashboard:", error);

                if (!mounted) {
                    return;
                }

                setError(
                    "Unable to load your dashboard. Please try again."
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadDashboard();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <DashboardView
            user={user}
            projects={projects}
            projectAnalytics={projectAnalytics}
            loading={loading}
            error={error}
            onLogout={logout}
        />
    );
}

export default Dashboard;