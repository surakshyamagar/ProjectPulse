export type IssueStatus =
    | "OPEN"
    | "IN_PROGRESS"
    | "RESOLVED"
    | "CLOSED";

export type IssuePriority =
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

export interface Issue {
    id: number;
    projectId: number;
    title: string;
    description?: string | null;
    status: IssueStatus;
    priority: IssuePriority;
    createdAt: string;
    updatedAt: string;
}

export interface CreateIssueData {
    title: string;
    description?: string;
    status?: IssueStatus;
    priority?: IssuePriority;
}