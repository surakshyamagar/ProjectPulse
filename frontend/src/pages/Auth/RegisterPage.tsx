import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import RegisterView from "../Views/authViews/RegisterView";
import { registerUser } from "../../services/auth/authService";

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await registerUser({
                name,
                email,
                password,
            });

            console.log(response);

            alert("Registration successful!");

            navigate("/");
        } catch (error: unknown) {
            console.log(error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegisterView
            name={name}
            email={email}
            password={password}
            error={error}
            loading={loading}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
        />
    );
}

export default RegisterPage;

