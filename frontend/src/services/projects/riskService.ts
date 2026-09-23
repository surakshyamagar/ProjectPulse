import api from "../api/api";

import type { RiskData } from "../../types/risk";

export const getProjectRisk = async (
    projectId: number
): Promise<RiskData> => {
    const response = await api.get<RiskData>(
        `/ml/projects/${projectId}/risk`
    );

    return response.data;
};