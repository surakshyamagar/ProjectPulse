import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { ProjectStatus } from "../../types/project";
import CreateProjectView from "../Views/projectViews/CreateProjectView";
import { createProject } from "../../services/projects/projectService";


function CreateProject() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [status, setStatus] =
        useState<ProjectStatus>("ACTIVE");

    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const createdProject = await createProject({
                name,
                description,
                status,

                startDate: startDate
                    ? new Date(startDate).toISOString()
                    : undefined,

                deadline: deadline
                    ? new Date(deadline).toISOString()
                    : undefined,
            });

            alert("Project created successfully!");

            navigate(`/projects/${createdProject.id}`);
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to create project"
                );
            } else {
                setError("Failed to create project");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <CreateProjectView
            name={name}
            description={description}
            status={status}
            startDate={startDate}
            deadline={deadline}
            loading={loading}
            error={error}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onStatusChange={setStatus}
            onStartDateChange={setStartDate}
            onDeadlineChange={setDeadline}
            onSubmit={handleSubmit}
        />
    );
}

export default CreateProject;