import type { AnalyticsResponse } from "../../types/analytics";
import api from "../api/api";


export const getProjectAnalytics = async (
    projectId: number
): Promise<AnalyticsResponse> => {
    const response = await api.get(
        `/projects/${projectId}/analytics`
    );

    return response.data.data;
};