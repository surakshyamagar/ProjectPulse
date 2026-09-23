import type { CreateIssueData, Issue } from "../../types/issue";
import api from "../api/api";

export const createIssue = async (
    projectId: number,
    data: CreateIssueData
): Promise<Issue> => {
    const response = await api.post(
        `/projects/${projectId}/issues`,
        data
    );

    return response.data.data;
};

export const getIssues = async (
    projectId: number
): Promise<Issue[]> => {
    const response = await api.get(
        `/projects/${projectId}/issues`
    );

    return response.data.data;
};

export const updateIssue = async (
    id: number,
    data: Partial<CreateIssueData>
): Promise<Issue> => {
    const response = await api.patch(
        `/issues/${id}`,
        data
    );

    return response.data.data;
};

export const deleteIssue = async (
    id: number
) => {
    const response = await api.delete(
        `/issues/${id}`
    );

    return response.data;
};