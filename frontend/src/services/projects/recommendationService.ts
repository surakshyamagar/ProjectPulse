import api from "../api/api";

export interface RiskFactor {
    factor: string;
    value: number;
    severity: "LOW" | "MEDIUM" | "HIGH";
    explanation: string;
}

export interface RecommendedAction {
    priority: "LOW" | "MEDIUM" | "HIGH";
    action: string;
    reason: string;
}

export interface RecommendationData {
    riskLevel: "LOW" | "MEDIUM" | "HIGH";

    probabilities: {
        LOW: number;
        MEDIUM: number;
        HIGH: number;
    };

    riskFactors: RiskFactor[];

    recommendations: RecommendedAction[];
}

export const getProjectRecommendations = async (
    projectId: number
): Promise<RecommendationData> => {
    const response = await api.get(
        `/projects/${projectId}/recommendations`
    );

    return response.data.data;
};