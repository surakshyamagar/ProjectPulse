import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import IssuesView from "../Views/projectViews/IssuesView";
import { createIssue, deleteIssue, getIssues, updateIssue } from "../../services/projects/issueService";
import type { Issue, IssuePriority, IssueStatus } from "../../types/issue";


function Issues() {
    const { projectId } = useParams();

    const [issues, setIssues] = useState<Issue[]>([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [priority, setPriority] =
        useState<IssuePriority>("MEDIUM");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load issues
    useEffect(() => {
        const loadIssues = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(projectId);

                if (!Number.isInteger(id) || id <= 0) {
                    setError("Invalid project ID");
                    return;
                }

                const data = await getIssues(id);

                setIssues(data);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load issues"
                    );
                } else {
                    setError("Failed to load issues");
                }
            } finally {
                setLoading(false);
            }
        };

        loadIssues();
    }, [projectId]);

    // Create issue
    const handleCreate = async () => {
        try {
            setSaving(true);
            setError("");

            const id = Number(projectId);

            if (!Number.isInteger(id) || id <= 0) {
                setError("Invalid project ID");
                return;
            }

            const newIssue = await createIssue(id, {
                title,
                description,
                status: "OPEN",
                priority,
            });

            setIssues((current) => [
                newIssue,
                ...current,
            ]);

            setTitle("");
            setDescription("");
            setPriority("MEDIUM");

            alert("Issue created successfully!");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to create issue"
                );
            } else {
                setError("Failed to create issue");
            }
        } finally {
            setSaving(false);
        }
    };

    // Update issue status
    const handleStatusChange = async (
        issue: Issue,
        status: IssueStatus
    ) => {
        try {
            const updatedIssue = await updateIssue(
                issue.id,
                {
                    status,
                }
            );

            setIssues((current) =>
                current.map((item) =>
                    item.id === updatedIssue.id
                        ? updatedIssue
                        : item
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to update issue"
                );
            } else {
                alert("Failed to update issue");
            }
        }
    };

    // Update issue priority
    const handlePriorityChange = async (
        issue: Issue,
        priority: IssuePriority
    ) => {
        try {
            const updatedIssue = await updateIssue(
                issue.id,
                {
                    priority,
                }
            );

            setIssues((current) =>
                current.map((item) =>
                    item.id === updatedIssue.id
                        ? updatedIssue
                        : item
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to update issue"
                );
            } else {
                alert("Failed to update issue");
            }
        }
    };

    // Delete issue
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this issue?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteIssue(id);

            setIssues((current) =>
                current.filter(
                    (issue) => issue.id !== id
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to delete issue"
                );
            } else {
                alert("Failed to delete issue");
            }
        }
    };

    return (
        <IssuesView
            issues={issues}
            title={title}
            description={description}
            priority={priority}
            loading={loading}
            saving={saving}
            error={error}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onPriorityChange={setPriority}
            onCreate={handleCreate}
            onStatusChange={handleStatusChange}
            onPriorityUpdate={handlePriorityChange}
            onDelete={handleDelete}
        />
    );
}

export default Issues;