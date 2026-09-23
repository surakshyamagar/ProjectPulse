import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";

import { useAuth } from "../../hooks/useAuth";
import LoginView from "../Views/authViews/LoginView";


function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login({
                email,
                password,
            });

            alert("Login Successful!");

            navigate("/dashboard");
        } catch (error) {
            console.log(error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginView
            email={email}
            password={password}
            error={error}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
        />
    );
}

export default LoginPage;