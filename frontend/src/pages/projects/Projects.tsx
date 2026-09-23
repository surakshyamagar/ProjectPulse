import { useEffect, useState } from "react";
import axios from "axios";
import type { Project } from "../../types/project";
import ProjectsView from "../Views/projectViews/ProjectsView";
import { deleteProject, getProjects } from "../../services/projects/projectService";


function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load projects
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setError("");

                const data = await getProjects();

                setProjects(data);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load projects"
                    );
                } else {
                    setError("Failed to load projects");
                }
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // Delete project
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteProject(id);

            setProjects((currentProjects) =>
                currentProjects.filter(
                    (project) => project.id !== id
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to delete project"
                );
            } else {
                alert("Failed to delete project");
            }
        }
    };

    return (
        <ProjectsView
            projects={projects}
            loading={loading}
            error={error}
            onDelete={handleDelete}
        />
    );
}

export default Projects;