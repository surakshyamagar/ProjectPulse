import axios from "axios";

// Node backend connects to the Python ML service.
const ML_SERVICE_URL =
    "http://127.0.0.1:8000";

// ============================================
// Data sent from Node.js to Python ML service
// ============================================

export interface RiskPredictionInput {
    project_progress: number;
    task_completion_rate: number;
    blocked_task_ratio: number;
    overdue_task_ratio: number;
    requirement_completion_rate: number;
    milestone_completion_rate: number;
    open_issue_count: number;
    critical_issue_count: number;
    api_test_failure_rate: number;
    avg_api_response_time_ms: number;
    technical_review_score: number;
    days_remaining: number;
    development_velocity: number;
}

// ============================================
// Raw SHAP factor returned by Python
// ============================================

export interface MLRiskFactor {
    feature: string;
    value: number;
    impact: number;
}

// ============================================
// Response returned by Python ML service
// ============================================

export interface RiskPrediction {
    risk_level:
        | "LOW"
        | "MEDIUM"
        | "HIGH";

    probabilities: {
        LOW: number;
        MEDIUM: number;
        HIGH: number;
    };

    risk_factors: MLRiskFactor[];
}

// ============================================
// Predict project risk
// ============================================

export const predictProjectRisk = async (
    projectData: RiskPredictionInput
): Promise<RiskPrediction> => {
    const response =
        await axios.post<RiskPrediction>(
            `${ML_SERVICE_URL}/predict`,
            projectData
        );

    return response.data;
};