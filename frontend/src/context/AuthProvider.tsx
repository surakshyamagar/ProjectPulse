import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthUser, LoginData, RegisterData} from "../types/auth";
import { getProfile, loginUser, logoutUser, registerUser } from "../services/auth/authService";

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await getProfile();

                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const login = async (data: LoginData) => {
        await loginUser(data);

        const currentUser = await getProfile();

        setUser(currentUser);
    };

    const register = async (data: RegisterData) => {
        await registerUser(data);
    };

    const logout = async () => {
        await logoutUser();

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}