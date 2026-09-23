import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    // Wait until we know whether the user is logged in
    if (loading) {
        return <p>Loading...</p>;
    }

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in
    return children;
}

export default ProtectedRoute;