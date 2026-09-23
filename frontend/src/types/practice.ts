export type PracticeKey =
    | "AUTHENTICATION"
    | "INPUT_VALIDATION"
    | "ERROR_HANDLING"
    | "RATE_LIMITING"
    | "API_DOCUMENTATION"
    | "INTEGRATION_TESTING"
    | "SECURITY_HEADERS"
    | "LOGGING";

export interface ProjectPractice {
    id: number;
    projectId: number;
    key: PracticeKey;
    implemented: boolean;
    notes?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface TechnicalReview {
    score: number;
    totalPractices: number;
    implementedCount: number;
    missingCount: number;
    implementedPractices: PracticeKey[];
    missingPractices: PracticeKey[];
    recommendations: string[];
}