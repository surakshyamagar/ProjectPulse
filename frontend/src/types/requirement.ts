export type RequirementStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "COMPLETED";

export interface Requirement {
    id: number;
    projectId: number;
    title: string;
    description?: string | null;
    status: RequirementStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRequirementData {
    title: string;
    description?: string;
    status?: RequirementStatus;
}