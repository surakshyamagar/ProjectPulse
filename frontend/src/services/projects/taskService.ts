import type { CreateTaskData, Task } from "../../types/task";
import api from "../api/api";

export const createTask = async (
    milestoneId: number,
    data: CreateTaskData
): Promise<Task> => {
    const response = await api.post(
        `/milestones/${milestoneId}/tasks`,
        data
    );

    return response.data.data;
};

export const getTasks = async (
    milestoneId: number
): Promise<Task[]> => {
    const response = await api.get(
        `/milestones/${milestoneId}/tasks`
    );

    return response.data.data;
};

export const updateTask = async (
    id: number,
    data: Partial<CreateTaskData>
): Promise<Task> => {
    const response = await api.patch(
        `/tasks/${id}`,
        data
    );

    return response.data.data;
};

export const deleteTask = async (
    id: number
) => {
    const response = await api.delete(
        `/tasks/${id}`
    );

    return response.data;
};