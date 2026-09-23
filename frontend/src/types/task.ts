export type TaskStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "BLOCKED";

export type TaskPriority =
    | "LOW"
    | "MEDIUM"
    | "HIGH";

export interface Task {
    id: number;
    milestoneId: number;
    title: string;
    description?: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskData {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: string;
}