import type { ApiTest, CreateApiTestData } from "../../types/apiTest";
import api from "../api/api";


export const createApiTest = async (
    projectId: number,
    data: CreateApiTestData
): Promise<ApiTest> => {
    const response = await api.post(
        `/projects/${projectId}/api-tests`,
        data
    );

    return response.data.data;
};

export const getApiTests = async (
    projectId: number
): Promise<ApiTest[]> => {
    const response = await api.get(
        `/projects/${projectId}/api-tests`
    );

    return response.data.data;
};