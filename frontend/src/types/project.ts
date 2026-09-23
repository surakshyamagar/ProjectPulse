export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ON_HOLD";

export interface Project {
    id: number;
    userId: number;
    name: string;
    description?: string | null;
    status: ProjectStatus;
    startDate?: string | null;
    deadline?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectData {
    name: string;
    description?: string;
    status?: ProjectStatus;
    startDate?: string;
    deadline?: string;
}