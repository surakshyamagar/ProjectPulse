import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { Milestone } from "../../types/milestone";
import MilestonesView from "../Views/projectViews/MilestonesView";
import { createMilestone, deleteMilestone, getMilestones, updateMilestone } from "../../services/projects/milestoneService";

function Milestones() {
    const { projectId } = useParams();

    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMilestones = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(projectId);

                if (!Number.isInteger(id) || id <= 0) {
                    setError("Invalid project ID");
                    return;
                }

                const data = await getMilestones(id);
                setMilestones(data);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load milestones"
                    );
                } else {
                    setError("Failed to load milestones");
                }
            } finally {
                setLoading(false);
            }
        };

        loadMilestones();
    }, [projectId]);

    const handleCreate = async () => {
        try {
            setSaving(true);
            setError("");

            const id = Number(projectId);

            if (!Number.isInteger(id) || id <= 0) {
                setError("Invalid project ID");
                return;
            }

            const newMilestone = await createMilestone(id, {
                name,
                description,
            });

            setMilestones((currentMilestones) => [
                newMilestone,
                ...currentMilestones,
            ]);

            setName("");
            setDescription("");

            alert("Milestone created successfully!");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to create milestone"
                );
            } else {
                setError("Failed to create milestone");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async (milestone: Milestone) => {
        const newName = window.prompt(
            "Enter new milestone name:",
            milestone.name
        );

        if (newName === null) {
            return;
        }

        if (newName.trim() === "") {
            alert("Milestone name cannot be empty");
            return;
        }

        try {
            const updatedMilestone = await updateMilestone(
                milestone.id,
                {
                    name: newName.trim(),
                }
            );

            setMilestones((currentMilestones) =>
                currentMilestones.map((item) =>
                    item.id === updatedMilestone.id
                        ? updatedMilestone
                        : item
                )
            );

            alert("Milestone updated successfully!");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to update milestone"
                );
            } else {
                alert("Failed to update milestone");
            }
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this milestone?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteMilestone(id);

            setMilestones((currentMilestones) =>
                currentMilestones.filter(
                    (milestone) => milestone.id !== id
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to delete milestone"
                );
            } else {
                alert("Failed to delete milestone");
            }
        }
    };

    return (
        <MilestonesView
            milestones={milestones}
            name={name}
            description={description}
            loading={loading}
            saving={saving}
            error={error}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
}

export default Milestones;