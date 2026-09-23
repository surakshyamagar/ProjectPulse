export type ProjectHealth =
    | "HEALTHY"
    | "WARNING"
    | "AT_RISK";

export interface AnalyticsResponse {
    project: {
        id: number;
        name: string;
        status: string;
        deadline?: string | null;
    };

    progress: {
        projectProgress: number;
        completedTasks: number;
        totalTasks: number;
    };

    requirements: {
        total: number;
        completed: number;
        completionRate: number;
    };

    milestones: {
        total: number;
        completed: number;
        completionRate: number;
    };

    tasks: {
        total: number;
        completed: number;
        inProgress: number;
        todo: number;
        blocked: number;
        overdue: number;
        completionRate: number;
    };

    issues: {
        total: number;
        open: number;
        inProgress: number;
        resolved: number;
        closed: number;
        critical: number;
        high: number;
    };

    apiTests: {
        total: number;
        passed: number;
        failed: number;
        failureRate: number;
        averageResponseTime: number;
    };

    technicalReview: {
        score: number | null;
    };

    health: {
        status: ProjectHealth;
        reasons: string[];
    };
}