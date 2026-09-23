import { createContext } from "react";

import type {
    AuthUser,
    LoginData,
    RegisterData,
} from "../types/auth";

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;

    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);