import type { CreateProjectData, Project } from "../../types/project";
import api from "../api/api";

export const createProject = async (
    data: CreateProjectData
): Promise<Project> => {
    const response = await api.post("/projects", data);

    return response.data.data;
};

export const getProjects = async (): Promise<Project[]> => {
    const response = await api.get("/projects");

    return response.data.data;
};

export const getProject = async (
    id: number
): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);

    return response.data.data;
};

export const updateProject = async (
    id: number,
    data: Partial<CreateProjectData>
): Promise<Project> => {
    const response = await api.patch(`/projects/${id}`, data);

    return response.data.data;
};

export const deleteProject = async (
    id: number
) => {
    const response = await api.delete(`/projects/${id}`);

    return response.data;
};