import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import type { ApiTest } from "../../types/apiTest";
import ApiTestsView from "../Views/projectViews/ApiTestsView";
import { createApiTest, getApiTests } from "../../services/projects/apiTestService";



function ApiTests() {
    const { projectId } = useParams();

    const [apiTests, setApiTests] = useState<ApiTest[]>([]);

    const [endpoint, setEndpoint] = useState("");
    const [method, setMethod] = useState("GET");
    const [statusCode, setStatusCode] = useState(200);
    const [passed, setPassed] = useState(true);
    const [responseTime, setResponseTime] = useState(0);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load API tests
    useEffect(() => {
        const loadApiTests = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(projectId);

                if (!Number.isInteger(id) || id <= 0) {
                    setError("Invalid project ID");
                    return;
                }

                const data = await getApiTests(id);

                setApiTests(data);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load API tests"
                    );
                } else {
                    setError("Failed to load API tests");
                }
            } finally {
                setLoading(false);
            }
        };

        loadApiTests();
    }, [projectId]);

    // Create API test
    const handleCreate = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const id = Number(projectId);

            if (!Number.isInteger(id) || id <= 0) {
                setError("Invalid project ID");
                return;
            }

            const newApiTest = await createApiTest(id, {
                endpoint,
                method,
                statusCode,
                passed,
                responseTime,
            });

            setApiTests((current) => [
                newApiTest,
                ...current,
            ]);

            setEndpoint("");
            setMethod("GET");
            setStatusCode(200);
            setPassed(true);
            setResponseTime(0);

            alert("API test recorded successfully!");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to record API test"
                );
            } else {
                setError("Failed to record API test");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <ApiTestsView
            apiTests={apiTests}
            endpoint={endpoint}
            method={method}
            statusCode={statusCode}
            passed={passed}
            responseTime={responseTime}
            loading={loading}
            saving={saving}
            error={error}
            onEndpointChange={setEndpoint}
            onMethodChange={setMethod}
            onStatusCodeChange={setStatusCode}
            onPassedChange={setPassed}
            onResponseTimeChange={setResponseTime}
            onCreate={handleCreate}
        />
    );
}

export default ApiTests;