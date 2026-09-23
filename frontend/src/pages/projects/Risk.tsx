import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { RiskData } from "../../types/risk";
import RiskView from "../Views/projectViews/RiskView";
import { getProjectRisk } from "../../services/projects/riskService";

function Risk() {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<RiskData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRisk = async () => {
            try {
                setLoading(true);
                setError("");
                setData(null);

                const projectId = Number(id);

                if (Number.isNaN(projectId)) {
                    setError("Invalid project ID");
                    return;
                }

                const riskData =
                    await getProjectRisk(projectId);

                setData(riskData);
            } catch (error: unknown) {
                console.error(
                    "Failed to load project risk:",
                    error
                );

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ??
                            "Failed to load project risk"
                    );
                } else {
                    setError(
                        "Failed to load project risk"
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        loadRisk();
    }, [id]);

    return (
        <RiskView
            data={data}
            loading={loading}
            error={error}
        />
    );
}

export default Risk;