import { Link } from "react-router-dom";
import {
    Activity,
    ArrowLeft,
    ArrowRight,
    FolderKanban,
    Plus,
    Trash2,
} from "lucide-react";
import type { Project } from "../../../types/project";

interface ProjectsViewProps {
    projects: Project[];
    loading: boolean;
    error: string;
    onDelete: (id: number) => void;
}

function ProjectsView({
    projects,
    loading,
    error,
    onDelete,
}: ProjectsViewProps) {
    /* =========================================================
       LOADING STATE
    ========================================================= */

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                {/* Header */}
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                        <div className="h-9 w-32 animate-pulse rounded-lg bg-slate-200" />
                    </div>
                </header>

                {/* Main */}
                <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="animate-pulse">
                        {/* Heading */}

                        <div className="space-y-3">
                            <div className="h-3 w-24 rounded bg-slate-200" />

                            <div className="h-9 w-52 rounded-lg bg-slate-200" />

                            <div className="h-4 w-80 rounded bg-slate-200" />
                        </div>

                        {/* Cards */}

                        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            <div className="h-60 rounded-2xl border border-slate-200 bg-white" />

                            <div className="h-60 rounded-2xl border border-slate-200 bg-white" />

                            <div className="h-60 rounded-2xl border border-slate-200 bg-white" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Link
                        to="/dashboard"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition duration-200 hover:text-slate-900"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />

                        Dashboard
                    </Link>

                    <Link
                        to="/projects/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition duration-200 hover:bg-blue-700 hover:shadow-md"
                    >
                        <Plus size={17} />

                        New Project
                    </Link>
                </div>
            </header>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {/* Decorative background */}

                    <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

                    <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />

                    <div className="relative flex flex-col gap-7 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-9">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <Activity size={17} />
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                                    Project Workspace
                                </span>
                            </div>

                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                My Projects
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                Manage your software projects, organize
                                development work, and track progress from one
                                workspace.
                            </p>
                        </div>

                        {/* Project count */}

                        <div className="flex shrink-0 items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                                <FolderKanban size={19} />
                            </div>

                            <div>
                                <p className="text-2xl font-bold tracking-tight text-slate-900">
                                    {projects.length}
                                </p>

                                <p className="text-xs font-medium text-slate-500">
                                    {projects.length === 1
                                        ? "Project"
                                        : "Projects"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                        <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                        <p>{error}</p>
                    </div>
                )}

                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {projects.length === 0 ? (
                    <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                            <FolderKanban size={25} />
                        </div>

                        <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                            No projects yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                            Create your first software project to start
                            organizing requirements, milestones, tasks, issues,
                            API tests, and development progress.
                        </p>

                        <Link
                            to="/projects/create"
                            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition duration-200 hover:bg-blue-700 hover:shadow-md"
                        >
                            <Plus size={17} />

                            Create Project
                        </Link>
                    </section>
                ) : (
                    /* =================================================
                       PROJECT GRID
                    ================================================= */

                    <section className="mt-8">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                                    Your projects
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Select a project to continue development.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => {
                                const statusLabel =
                                    project.status === "ON_HOLD"
                                        ? "On Hold"
                                        : project.status === "ACTIVE"
                                        ? "Active"
                                        : "Completed";

                                const statusClasses =
                                    project.status === "ACTIVE"
                                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10"
                                        : project.status === "COMPLETED"
                                        ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/10"
                                        : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/10";

                                return (
                                    <article
                                        key={project.id}
                                        className="group flex min-h-[270px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                                    >
                                        {/* Card top */}

                                        <div className="flex items-start justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                                <FolderKanban size={20} />
                                            </div>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}
                                            >
                                                {statusLabel}
                                            </span>
                                        </div>

                                        {/* Project information */}

                                        <div className="mt-6 flex-1">
                                            <h2 className="text-lg font-semibold tracking-tight text-slate-900 transition duration-200 group-hover:text-blue-700">
                                                {project.name}
                                            </h2>

                                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                                                {project.description ||
                                                    "No description provided."}
                                            </p>
                                        </div>

                                        {/* Project metadata */}

                                        <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />

                                            <span>
                                                Project #{project.id}
                                            </span>
                                        </div>

                                        {/* Actions */}

                                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                            <Link
                                                to={`/projects/${project.id}`}
                                                className="group/link inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition duration-200 hover:text-blue-700"
                                            >
                                                View project

                                                <ArrowRight
                                                    size={16}
                                                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                                                />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(project.id)
                                                }
                                                className="rounded-lg p-2 text-slate-400 transition duration-200 hover:bg-red-50 hover:text-red-600"
                                                title="Delete project"
                                                aria-label={`Delete ${project.name}`}
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default ProjectsView;