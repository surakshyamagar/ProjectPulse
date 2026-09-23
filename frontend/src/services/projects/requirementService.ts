import type { CreateRequirementData, Requirement } from "../../types/requirement";
import api from "../api/api";

export const createRequirement = async (
    projectId: number,
    data: CreateRequirementData
): Promise<Requirement> => {
    const response = await api.post(
        `/projects/${projectId}/requirements`,
        data
    );

    return response.data.data;
};

export const getRequirements = async (
    projectId: number
): Promise<Requirement[]> => {
    const response = await api.get(
        `/projects/${projectId}/requirements`
    );

    return response.data.data;
};

export const updateRequirement = async (
    id: number,
    data: Partial<CreateRequirementData>
): Promise<Requirement> => {
    const response = await api.patch(
        `/requirements/${id}`,
        data
    );

    return response.data.data;
};

export const deleteRequirement = async (
    id: number
) => {
    const response = await api.delete(
        `/requirements/${id}`
    );

    return response.data;
};