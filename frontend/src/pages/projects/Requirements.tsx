import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type {Requirement, RequirementStatus} from "../../types/requirement";
import RequirementsView from "../Views/projectViews/RequirementsView";
import { createRequirement, deleteRequirement, getRequirements, updateRequirement } from "../../services/projects/requirementService";


function Requirements() {
    const { projectId } = useParams();

    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRequirements = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(projectId);

                if (Number.isNaN(id)) {
                    setError("Invalid project ID");
                    return;
                }

                const data = await getRequirements(id);
                setRequirements(data);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load requirements"
                    );
                } else {
                    setError("Failed to load requirements");
                }
            } finally {
                setLoading(false);
            }
        };

        loadRequirements();
    }, [projectId]);

    const handleCreate = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setError("");

            const id = Number(projectId);

            if (Number.isNaN(id)) {
                setError("Invalid project ID");
                return;
            }

            const newRequirement = await createRequirement(id, {
                title,
                description,
                status: "TODO",
            });

            setRequirements((currentRequirements) => [
                newRequirement,
                ...currentRequirements,
            ]);

            setTitle("");
            setDescription("");

            alert("Requirement created successfully!");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to create requirement"
                );
            } else {
                setError("Failed to create requirement");
            }
        }
    };

    const handleStatusChange = async (
        requirement: Requirement,
        status: RequirementStatus
    ) => {
        try {
            const updatedRequirement = await updateRequirement(
                requirement.id,
                { status }
            );

            setRequirements((currentRequirements) =>
                currentRequirements.map((item) =>
                    item.id === updatedRequirement.id
                        ? updatedRequirement
                        : item
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to update requirement"
                );
            } else {
                alert("Failed to update requirement");
            }
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this requirement?"
        );

        if (!confirmed) return;

        try {
            await deleteRequirement(id);

            setRequirements((currentRequirements) =>
                currentRequirements.filter(
                    (requirement) => requirement.id !== id
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to delete requirement"
                );
            } else {
                alert("Failed to delete requirement");
            }
        }
    };

    const numericProjectId = Number(projectId);

    return (
        <RequirementsView
            requirements={requirements}
            loading={loading}
            error={error}
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onCreate={handleCreate}
            onUpdateStatus={(id, status) => {
                const requirement = requirements.find(
                    (item) => item.id === id
                );

                if (requirement) {
                    handleStatusChange(requirement, status);
                }
            }}
            onDelete={handleDelete}
            projectId={numericProjectId}
        />
    );
}

export default Requirements;