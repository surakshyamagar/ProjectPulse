import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { AnalyticsResponse } from "../../types/analytics";

import AnalyticsView from "../Views/projectViews/AnalyticsView";
import { getProjectAnalytics } from "../../services/projects/analyticsService";



function Analytics() {
    const { projectId } = useParams();

    const [analytics, setAnalytics] =
        useState<AnalyticsResponse | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(projectId);

                if (!Number.isInteger(id) || id <= 0) {
                    setError("Invalid project ID");
                    return;
                }

                const data = await getProjectAnalytics(id);

                setAnalytics(data);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load analytics"
                    );
                } else {
                    setError("Failed to load analytics");
                }
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, [projectId]);

    return (
        <AnalyticsView
            projectId={projectId}
            analytics={analytics}
            loading={loading}
            error={error}
        />
    );
}

export default Analytics;