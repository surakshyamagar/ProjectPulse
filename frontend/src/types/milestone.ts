export interface Milestone {
    id: number;
    projectId: number;
    name: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;

    // Derived from the milestone's tasks.
    // This is not stored in the database.
    completed: boolean;
}

export interface CreateMilestoneData {
    name: string;
    description?: string;
}