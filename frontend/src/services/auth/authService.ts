import type {AuthUser,LoginData,RegisterData} from "../../types/auth";
import api from "../api/api";

export const registerUser = async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);

    return response.data;
};

export const loginUser = async (data: LoginData) => {
    const response = await api.post("/auth/login", data);

    return response.data;
};

export const getProfile = async (): Promise<AuthUser> => {
    const response = await api.get("/auth/profile");

    return response.data.data;
};

export const logoutUser = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
};