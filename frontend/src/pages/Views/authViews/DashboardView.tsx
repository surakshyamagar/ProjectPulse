import { Link } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    CircleAlert,
    Clock3,
    FolderKanban,
    LogOut,
    Plus,
    Sparkles,
} from "lucide-react";
import type { AnalyticsResponse } from "../../../types/analytics";
import type { Project } from "../../../types/project";


interface DashboardUser {
    name?: string | null;
    email?: string | null;
}

interface ProjectAnalytics {
    projectId: number;
    analytics: AnalyticsResponse;
}

interface DashboardViewProps {
    user: DashboardUser | null;
    projects: Project[];
    projectAnalytics: ProjectAnalytics[];
    loading: boolean;
    error: string;
    onLogout: () => void;
}

function DashboardView({
    user,
    projects,
    projectAnalytics,
    loading,
    error,
    onLogout,
}: DashboardViewProps) {
    const firstName = user?.name?.split(" ")[0] || "Developer";

    /* =========================================================
       REAL DASHBOARD DATA
    ========================================================= */

    const activeProjects = projects.filter(
        (project) => project.status === "ACTIVE"
    ).length;

    const completedProjects = projects.filter(
        (project) => project.status === "COMPLETED"
    ).length;

    const onHoldProjects = projects.filter(
        (project) => project.status === "ON_HOLD"
    ).length;

    const progressValues = projectAnalytics
        .map(
            ({ analytics }) =>
                analytics.progress?.projectProgress ?? null
        )
        .filter((value): value is number => value !== null);

    const averageProgress =
        progressValues.length > 0
            ? Math.round(
                  progressValues.reduce(
                      (total, value) => total + value,
                      0
                  ) / progressValues.length
              )
            : 0;

    const atRiskProjects = projectAnalytics.filter(
        ({ analytics }) => analytics.health?.status === "AT_RISK"
    ).length;

    const warningProjects = projectAnalytics.filter(
        ({ analytics }) => analytics.health?.status === "WARNING"
    ).length;

    const healthyProjects = projectAnalytics.filter(
        ({ analytics }) =>
            analytics.health?.status !== "AT_RISK" &&
            analytics.health?.status !== "WARNING"
    ).length;

    const getAnalyticsForProject = (projectId: number) => {
        return projectAnalytics.find(
            (item) => item.projectId === projectId
        )?.analytics;
    };

    const recentProjects = projects.slice(0, 4);

    /* =========================================================
       FORMAT HELPERS
    ========================================================= */

    const formatStatus = (status: string) => {
        if (status === "ON_HOLD") {
            return "On Hold";
        }

        if (status === "COMPLETED") {
            return "Completed";
        }

        return "Active";
    };

    const getStatusClasses = (status: string) => {
        if (status === "ACTIVE") {
            return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10";
        }

        if (status === "COMPLETED") {
            return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/10";
        }

        return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/10";
    };

    const getHealthClasses = (status?: string) => {
        if (status === "AT_RISK") {
            return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10";
        }

        if (status === "WARNING") {
            return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/10";
        }

        return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10";
    };

    const getHealthLabel = (status?: string) => {
        if (status === "AT_RISK") {
            return "At Risk";
        }

        if (status === "WARNING") {
            return "Warning";
        }

        return "Healthy";
    };

    const formatDate = (date?: string | null) => {
        if (!date) {
            return "No deadline";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "No deadline";
        }

        return parsedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    /* =========================================================
       LOADING STATE
    ========================================================= */

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                        <div className="h-9 w-36 animate-pulse rounded-lg bg-slate-200" />

                        <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-4 w-32 rounded bg-slate-200" />

                        <div className="mt-4 h-10 w-80 rounded-lg bg-slate-200" />

                        <div className="mt-3 h-5 w-[32rem] max-w-full rounded bg-slate-200" />

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="h-36 rounded-2xl border border-slate-200 bg-white" />
                            <div className="h-36 rounded-2xl border border-slate-200 bg-white" />
                            <div className="h-36 rounded-2xl border border-slate-200 bg-white" />
                            <div className="h-36 rounded-2xl border border-slate-200 bg-white" />
                        </div>

                        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                            <div className="h-96 rounded-2xl border border-slate-200 bg-white" />
                            <div className="h-96 rounded-2xl border border-slate-200 bg-white" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    {/* Logo */}

                    <Link
                        to="/dashboard"
                        className="group flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-blue-700">
                            <Activity
                                size={20}
                                strokeWidth={2.2}
                                className="transition-transform duration-300 group-hover:rotate-6"
                            />
                        </div>

                        <span className="text-lg font-semibold tracking-tight text-slate-900">
                            ProjectPulse
                        </span>
                    </Link>

                    {/* User */}

                    <div className="flex items-center gap-4">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium text-slate-800">
                                {user?.name || "Developer"}
                            </p>

                            <p className="text-xs text-slate-400">
                                {user?.email || ""}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onLogout}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            <LogOut size={16} />

                            <span className="hidden sm:inline">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                        <CircleAlert
                            size={17}
                            className="mt-0.5 shrink-0"
                        />

                        <p>{error}</p>
                    </div>
                )}

                {/* =================================================
                    WELCOME
                ================================================= */}

                <section>
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

                        <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />

                        <div className="relative flex flex-col justify-between gap-7 p-6 sm:p-8 lg:flex-row lg:items-center lg:p-9">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                                    <Sparkles size={13} />

                                    Developer workspace
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Welcome back, {firstName}.
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                    Manage your software projects, track
                                    development progress, and understand
                                    project health from one workspace.
                                </p>
                            </div>

                            <Link
                                to="/projects/create"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
                            >
                                <Plus size={17} />

                                New project
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    REAL OVERVIEW CARDS
                ================================================= */}

                <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Projects */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:scale-105">
                            <FolderKanban size={20} />
                        </div>

                        <p className="mt-5 text-sm text-slate-500">
                            Total projects
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            {projects.length}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            {activeProjects} active
                            {completedProjects > 0
                                ? ` · ${completedProjects} completed`
                                : ""}
                        </p>
                    </div>

                    {/* Progress */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition duration-300 group-hover:scale-105">
                            <BarChart3 size={20} />
                        </div>

                        <p className="mt-5 text-sm text-slate-500">
                            Average progress
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            {progressValues.length > 0
                                ? `${averageProgress}%`
                                : "—"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Based on project task progress
                        </p>
                    </div>

                    {/* At Risk */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition duration-300 group-hover:scale-105">
                            <CircleAlert size={20} />
                        </div>

                        <p className="mt-5 text-sm text-slate-500">
                            Projects at risk
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            {atRiskProjects}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            {warningProjects > 0
                                ? `${warningProjects} warning`
                                : "No warning projects"}
                        </p>
                    </div>

                    {/* Healthy */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:scale-105">
                            <CheckCircle2
                                size={20}
                            />
                        </div>

                        <p className="mt-5 text-sm text-slate-500">
                            Healthy projects
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            {healthyProjects}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Based on project health
                        </p>
                    </div>
                </section>

                {/* =================================================
                    PROJECTS + QUICK ACTIONS
                ================================================= */}

                <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
                    {/* =================================================
                        RECENT PROJECTS
                    ================================================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Your projects
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Continue working on your software
                                    projects.
                                </p>
                            </div>

                            <Link
                                to="/projects"
                                className="group hidden items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:flex"
                            >
                                View all

                                <ArrowRight
                                    size={15}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                            </Link>
                        </div>

                        {recentProjects.length === 0 ? (
                            <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <FolderKanban size={22} />
                                </div>

                                <h3 className="mt-4 font-semibold text-slate-900">
                                    Start your first project
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    Create a software project to start
                                    organizing requirements, milestones,
                                    tasks, issues, API tests, analytics,
                                    and project intelligence.
                                </p>

                                <Link
                                    to="/projects/create"
                                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700"
                                >
                                    <Plus size={16} />

                                    Create project
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-6 space-y-3">
                                {recentProjects.map((project) => {
                                    const analytics =
                                        getAnalyticsForProject(
                                            project.id
                                        );

                                    const progress =
                                        analytics?.progress
                                            ?.projectProgress ?? null;

                                    const health =
                                        analytics?.health?.status;

                                    return (
                                        <Link
                                            key={project.id}
                                            to={`/projects/${project.id}`}
                                            className="group block rounded-xl border border-slate-200 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/20 hover:shadow-sm"
                                        >
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                {/* Project icon */}

                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                                    <FolderKanban
                                                        size={18}
                                                    />
                                                </div>

                                                {/* Project name */}

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="truncate text-sm font-semibold text-slate-900">
                                                            {
                                                                project.name
                                                            }
                                                        </h3>

                                                        <span
                                                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
                                                                project.status
                                                            )}`}
                                                        >
                                                            {formatStatus(
                                                                project.status
                                                            )}
                                                        </span>

                                                        {analytics && (
                                                            <span
                                                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getHealthClasses(
                                                                    health
                                                                )}`}
                                                            >
                                                                {getHealthLabel(
                                                                    health
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                                                        {project.description ||
                                                            "No project description"}
                                                    </p>
                                                </div>

                                                {/* Progress */}

                                                <div className="w-full sm:w-32">
                                                    <div className="mb-1.5 flex items-center justify-between">
                                                        <span className="text-[11px] font-medium text-slate-400">
                                                            Progress
                                                        </span>

                                                        <span className="text-[11px] font-semibold text-slate-600">
                                                            {progress !==
                                                            null
                                                                ? `${Math.round(
                                                                      progress
                                                                  )}%`
                                                                : "—"}
                                                        </span>
                                                    </div>

                                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                                        {progress !==
                                                            null && (
                                                            <div
                                                                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                                                                style={{
                                                                    width: `${Math.min(
                                                                        Math.max(
                                                                            progress,
                                                                            0
                                                                        ),
                                                                        100
                                                                    )}%`,
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Deadline */}

                                                <div className="hidden min-w-[105px] items-center gap-1.5 text-xs text-slate-400 lg:flex">
                                                    <CalendarDays
                                                        size={14}
                                                    />

                                                    <span>
                                                        {formatDate(
                                                            project.deadline
                                                        )}
                                                    </span>
                                                </div>

                                                <ArrowRight
                                                    size={16}
                                                    className="hidden shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-500 sm:block"
                                                />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        {recentProjects.length > 0 && (
                            <Link
                                to="/projects"
                                className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:hidden"
                            >
                                View all projects

                                <ArrowRight size={15} />
                            </Link>
                        )}
                    </div>

                    {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Quick actions
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Jump into your development workflow.
                            </p>
                        </div>

                        <div className="mt-6 space-y-3">
                            <Link
                                to="/projects"
                                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <FolderKanban size={17} />
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">
                                        My projects
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        View and manage projects
                                    </p>
                                </div>

                                <ArrowRight
                                    size={16}
                                    className="text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-500"
                                />
                            </Link>

                            <Link
                                to="/projects/create"
                                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <Plus size={17} />
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">
                                        Create project
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        Start a new software project
                                    </p>
                                </div>

                                <ArrowRight
                                    size={16}
                                    className="text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-500"
                                />
                            </Link>

                            <Link
                                to="/projects"
                                className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                    <BarChart3 size={17} />
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">
                                        Project insights
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        Open a project to view analytics
                                    </p>
                                </div>

                                <ArrowRight
                                    size={16}
                                    className="text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-500"
                                />
                            </Link>
                        </div>

                        {/* Workspace summary */}

                        <div className="mt-6 rounded-xl bg-slate-50 p-4">
                            <div className="flex items-center gap-2">
                                <Clock3
                                    size={15}
                                    className="text-slate-400"
                                />

                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Workspace summary
                                </span>
                            </div>

                            <div className="mt-3 grid grid-cols-3 gap-2">
                                <div>
                                    <p className="text-lg font-bold text-slate-900">
                                        {activeProjects}
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                        Active
                                    </p>
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-slate-900">
                                        {onHoldProjects}
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                        On hold
                                    </p>
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-slate-900">
                                        {completedProjects}
                                    </p>

                                    <p className="text-[11px] text-slate-400">
                                        Completed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    PROJECTPULSE WORKFLOW
                ================================================= */}

                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            ProjectPulse workflow
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Follow your project from initial idea to measurable
                            project intelligence.
                        </p>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-5">
                        {[
                            {
                                number: "01",
                                title: "Idea",
                                description: "Define the software idea",
                            },
                            {
                                number: "02",
                                title: "Requirements",
                                description: "Define system requirements",
                            },
                            {
                                number: "03",
                                title: "Plan",
                                description: "Organize development work",
                            },
                            {
                                number: "04",
                                title: "Development",
                                description: "Build, test and resolve issues",
                            },
                            {
                                number: "05",
                                title: "Intelligence",
                                description:
                                    "Analyze health and project risk",
                            },
                        ].map((step) => (
                            <div
                                key={step.number}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/40"
                            >
                                <p className="text-xs font-bold tracking-wide text-blue-600">
                                    {step.number}
                                </p>

                                <p className="mt-2 text-sm font-semibold text-slate-800">
                                    {step.title}
                                </p>

                                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default DashboardView;