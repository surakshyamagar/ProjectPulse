import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import RecommendationsView from "../Views/projectViews/RecommendationsView";
import { getProjectRecommendations, type RecommendationData } from "../../services/projects/recommendationService";


function Recommendations() {
    const { projectId } = useParams();

    const [data, setData] =
        useState<RecommendationData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // Load recommendations
    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(projectId);

                if (!Number.isInteger(id) || id <= 0) {
                    setError("Invalid project ID");
                    return;
                }

                const result =
                    await getProjectRecommendations(id);

                setData(result);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load recommendations"
                    );
                } else {
                    setError(
                        "Failed to load recommendations"
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, [projectId]);

    return (
        <RecommendationsView
            data={data}
            loading={loading}
            error={error}
        />
    );
}

export default Recommendations;