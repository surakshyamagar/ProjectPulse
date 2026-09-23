import type { PracticeKey, ProjectPractice, TechnicalReview } from "../../types/practice";
import api from "../api/api";

export const savePractice = async (
    projectId: number,
    data: {
        key: PracticeKey;
        implemented: boolean;
        notes?: string;
    }
): Promise<ProjectPractice> => {
    const response = await api.post(
        `/projects/${projectId}/practices`,
        data
    );

    return response.data.data;
};

export const getPractices = async (
    projectId: number
): Promise<ProjectPractice[]> => {
    const response = await api.get(
        `/projects/${projectId}/practices`
    );

    return response.data.data;
};

export const getTechnicalReview = async (
    projectId: number
): Promise<TechnicalReview> => {
    const response = await api.get(
        `/projects/${projectId}/review`
    );

    return response.data.data;
};

export const deletePractice = async (
    id: number
) => {
    const response = await api.delete(
        `/practices/${id}`
    );

    return response.data;
};