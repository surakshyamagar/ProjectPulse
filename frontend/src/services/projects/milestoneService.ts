import type { CreateMilestoneData, Milestone } from "../../types/milestone";
import api from "../api/api";

export const createMilestone = async (
    projectId: number,
    data: CreateMilestoneData
): Promise<Milestone> => {
    const response = await api.post(
        `/projects/${projectId}/milestones`,
        data
    );

    return response.data.data;
};

export const getMilestones = async (
    projectId: number
): Promise<Milestone[]> => {
    const response = await api.get(
        `/projects/${projectId}/milestones`
    );

    return response.data.data;
};

export const updateMilestone = async (
    id: number,
    data: Partial<CreateMilestoneData>
): Promise<Milestone> => {
    const response = await api.patch(
        `/milestones/${id}`,
        data
    );

    return response.data.data;
};

export const deleteMilestone = async (
    id: number
) => {
    const response = await api.delete(
        `/milestones/${id}`
    );

    return response.data;
};