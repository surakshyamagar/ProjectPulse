import { type FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import type { AnalyticsResponse } from "../../types/analytics";
import type { RiskData } from "../../types/risk";
import ProjectDetailsView from "../Views/projectViews/ProjectDetailsView";
import { deleteProject, getProject, updateProject } from "../../services/projects/projectService";
import { getProjectAnalytics } from "../../services/projects/analyticsService";
import { getProjectRisk } from "../../services/projects/riskService";
import type { Project, ProjectStatus } from "../../types/project";

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] =
        useState<Project | null>(null);

    const [analytics, setAnalytics] =
        useState<AnalyticsResponse | null>(null);

    const [risk, setRisk] =
        useState<RiskData | null>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [status, setStatus] =
        useState<ProjectStatus>("ACTIVE");

    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProject = async () => {
            try {
                setLoading(true);
                setError("");

                const projectId = Number(id);

                if (
                    !Number.isInteger(projectId) ||
                    projectId <= 0
                ) {
                    setError("Invalid project ID");
                    return;
                }

                const data = await getProject(projectId);

                setProject(data);
                setName(data.name);
                setDescription(data.description || "");
                setStatus(data.status);

                setStartDate(
                    data.startDate
                        ? data.startDate.substring(0, 10)
                        : ""
                );

                setDeadline(
                    data.deadline
                        ? data.deadline.substring(0, 10)
                        : ""
                );
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load project"
                    );
                } else {
                    setError("Failed to load project");
                }
            } finally {
                setLoading(false);
            }
        };

        loadProject();
    }, [id]);

    useEffect(() => {
        if (!project?.id) {
            return;
        }

        const loadProjectInsights = async () => {
            try {
                const [
                    analyticsData,
                    riskData,
                ] = await Promise.all([
                    getProjectAnalytics(project.id),
                    getProjectRisk(project.id),
                ]);

                setAnalytics(analyticsData);
                setRisk(riskData);
            } catch (error: unknown) {
                console.error(
                    "Failed to load project insights:",
                    error
                );
            }
        };

        loadProjectInsights();
    }, [project?.id]);

    const handleUpdate = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!project) {
            return;
        }

        try {
            setSaving(true);
            setError("");

            const updatedProject =
                await updateProject(
                    project.id,
                    {
                        name,
                        description,
                        status,
                        startDate: startDate
                            ? new Date(
                                  startDate
                              ).toISOString()
                            : undefined,
                        deadline: deadline
                            ? new Date(
                                  deadline
                              ).toISOString()
                            : undefined,
                    }
                );

            setProject(updatedProject);

            alert("Project updated successfully!");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to update project"
                );
            } else {
                setError("Failed to update project");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!project) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteProject(project.id);

            alert("Project deleted successfully!");

            navigate("/projects");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to delete project"
                );
            } else {
                setError("Failed to delete project");
            }
        }
    };

    return (
        <ProjectDetailsView
            project={project}
            analytics={analytics}
            risk={risk}
            name={name}
            description={description}
            status={status}
            startDate={startDate}
            deadline={deadline}
            loading={loading}
            saving={saving}
            error={error}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onStatusChange={setStatus}
            onStartDateChange={setStartDate}
            onDeadlineChange={setDeadline}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
}

export default ProjectDetails;