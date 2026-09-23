import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Circle,
    Flag,
    FolderKanban,
    ListChecks,
    Settings2,
    Trash2,
    Sparkles,
} from "lucide-react";
import type {Project, ProjectStatus} from "../../../types/project";
import type { AnalyticsResponse } from "../../../types/analytics";
import type { RiskData } from "../../../types/risk";

interface ProjectDetailsViewProps {
    project: Project | null;
    analytics: AnalyticsResponse | null;
    risk: RiskData | null;
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    deadline: string;
    loading: boolean;
    saving: boolean;
    error: string;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onStatusChange: (value: ProjectStatus) => void;
    onStartDateChange: (value: string) => void;
    onDeadlineChange: (value: string) => void;
    onUpdate: (event: FormEvent<HTMLFormElement>) => void;
    onDelete: () => void;
}

function ProjectDetailsView({
    project,
    name,
    description,
    status,
    startDate,
    deadline,
    loading,
    saving,
    error,
    onNameChange,
    onDescriptionChange,
    onStatusChange,
    onStartDateChange,
    onDeadlineChange,
    onUpdate,
    onDelete,
}: ProjectDetailsViewProps) {
    /* =========================================================
       LOADING STATE
    ========================================================= */

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="space-y-3">
                            <div className="h-4 w-32 rounded bg-slate-200" />

                            <div className="h-10 w-80 rounded-lg bg-slate-200" />

                            <div className="h-5 w-full max-w-2xl rounded bg-slate-200" />

                            <div className="h-5 w-3/4 max-w-xl rounded bg-slate-200" />
                        </div>

                        <div className="h-40 rounded-2xl border border-slate-200 bg-white" />

                        <div className="space-y-4">
                            <div className="h-6 w-48 rounded bg-slate-200" />

                            <div className="grid gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-5">
                                <div className="h-44 border-b border-slate-200 md:border-b-0 md:border-r" />
                                <div className="h-44 border-b border-slate-200 md:border-b-0 md:border-r" />
                                <div className="h-44 border-b border-slate-200 md:border-b-0 md:border-r" />
                                <div className="h-44 border-b border-slate-200 md:border-b-0 md:border-r" />
                                <div className="h-44" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    /* =========================================================
       ERROR STATE
    ========================================================= */

    if (error && !project) {
        return (
            <div className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
                <div className="mx-auto max-w-xl">
                    <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                            <Circle size={26} />
                        </div>

                        <h1 className="mt-5 text-xl font-semibold tracking-tight">
                            Unable to load project
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {error}
                        </p>

                        <Link
                            to="/projects"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                        >
                            <ArrowLeft size={16} />
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    /* =========================================================
       PROJECT NOT FOUND
    ========================================================= */

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-50 px-6 py-16 text-center text-slate-900">
                <div className="mx-auto max-w-md">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        <FolderKanban size={25} />
                    </div>

                    <h1 className="mt-5 text-xl font-semibold">
                        Project not found
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        The project you are looking for could not be found.
                    </p>

                    <Link
                        to="/projects"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        <ArrowLeft size={16} />
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    /* =========================================================
       STATUS
    ========================================================= */

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
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* =========================================================
                HEADER
            ========================================================= */}

            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition duration-200 hover:text-slate-900"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-200 group-hover:-translate-x-0.5"
                        />

                        Projects
                    </Link>

                    <Link
                        to="/dashboard"
                        className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-slate-900"
                    >
                        <FolderKanban size={17} />

                        Dashboard
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
                {/* =====================================================
                    PROJECT HEADER
                ===================================================== */}

                <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {/* Background decoration */}

                    <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

                    <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />

                    <div className="relative p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <FolderKanban size={18} />
                                    </div>

                                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                                        Project Workspace
                                    </span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}
                                    >
                                        {statusLabel}
                                    </span>
                                </div>

                                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    {project.name}
                                </h1>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                                    {project.description ||
                                        "Start by defining what you want to build and turn your idea into a structured development plan."}
                                </p>
                            </div>

                            <div className="shrink-0 rounded-xl border border-blue-100 bg-blue-50/60 p-4 lg:min-w-[190px]">
                                <div className="flex items-center gap-2 text-blue-600">
                                    <Sparkles size={16} />

                                    <span className="text-xs font-semibold uppercase tracking-wide">
                                        Current stage
                                    </span>
                                </div>

                                <p className="mt-2 text-sm font-semibold text-slate-800">
                                    Requirements
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Define what the system needs to do.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    ERROR
                ===================================================== */}

                {error && (
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                        <Circle
                            size={17}
                            className="mt-0.5 shrink-0"
                        />

                        <p>{error}</p>
                    </div>
                )}

                {/* =====================================================
                    CURRENT STAGE
                ===================================================== */}

                <section className="mt-8">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md sm:p-7">
                        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <ListChecks size={21} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
                                            Next step
                                        </span>

                                        <span className="h-1 w-1 rounded-full bg-slate-300" />

                                        <span className="text-xs text-slate-400">
                                            Step 1 of 5
                                        </span>
                                    </div>

                                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                                        Define Requirements
                                    </h2>

                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                        Start by describing the functional and
                                        technical requirements of your project.
                                        These requirements will guide the rest
                                        of the development process.
                                    </p>
                                </div>
                            </div>

                            <Link
                                to={`/projects/${project.id}/requirements`}
                                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition duration-200 hover:bg-blue-700 hover:shadow-md"
                            >
                                Start Requirements

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    DEVELOPMENT WORKFLOW
                ===================================================== */}

                <section className="mt-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                                Development workflow
                            </h2>

                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                                5 stages
                            </span>
                        </div>

                        <p className="mt-1.5 text-sm text-slate-500">
                            Follow the project from definition through
                            development and project intelligence.
                        </p>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="grid md:grid-cols-5">
                            {/* =================================================
                                STEP 1
                            ================================================= */}

                            <Link
                                to={`/projects/${project.id}/requirements`}
                                className="group relative border-b border-slate-200 p-5 transition duration-200 hover:bg-blue-50/40 md:border-b-0 md:border-r"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-4 ring-blue-50/50">
                                        <ListChecks size={18} />
                                    </div>

                                    <span className="text-[11px] font-bold tracking-wider text-blue-600">
                                        01
                                    </span>
                                </div>

                                <h3 className="mt-5 text-sm font-semibold text-slate-900">
                                    Requirements
                                </h3>

                                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                                    Define what the system needs to do.
                                </p>

                                <div className="mt-5 flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition duration-200 group-hover:opacity-100">
                                    Open
                                    <ArrowRight size={13} />
                                </div>
                            </Link>

                            {/* =================================================
                                STEP 2
                            ================================================= */}

                            <div className="border-b border-slate-200 p-5 md:border-b-0 md:border-r">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                        <Circle size={18} />
                                    </div>

                                    <span className="text-[11px] font-bold tracking-wider text-slate-400">
                                        02
                                    </span>
                                </div>

                                <h3 className="mt-5 text-sm font-semibold text-slate-700">
                                    Development Plan
                                </h3>

                                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                                    Turn requirements into a development plan.
                                </p>
                            </div>

                            {/* =================================================
                                STEP 3
                            ================================================= */}

                            <div className="border-b border-slate-200 p-5 md:border-b-0 md:border-r">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                        <Flag size={18} />
                                    </div>

                                    <span className="text-[11px] font-bold tracking-wider text-slate-400">
                                        03
                                    </span>
                                </div>

                                <h3 className="mt-5 text-sm font-semibold text-slate-700">
                                    Milestones
                                </h3>

                                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                                    Organize the work into meaningful stages.
                                </p>
                            </div>

                            {/* =================================================
                                STEP 4
                            ================================================= */}

                            <div className="border-b border-slate-200 p-5 md:border-b-0 md:border-r">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                        <CheckCircle2 size={18} />
                                    </div>

                                    <span className="text-[11px] font-bold tracking-wider text-slate-400">
                                        04
                                    </span>
                                </div>

                                <h3 className="mt-5 text-sm font-semibold text-slate-700">
                                    Development
                                </h3>

                                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                                    Work on tasks, issues and API tests.
                                </p>
                            </div>

                            {/* =================================================
                                STEP 5
                            ================================================= */}

                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                        <FolderKanban size={18} />
                                    </div>

                                    <span className="text-[11px] font-bold tracking-wider text-slate-400">
                                        05
                                    </span>
                                </div>

                                <h3 className="mt-5 text-sm font-semibold text-slate-700">
                                    Project Insights
                                </h3>

                                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                                    Measure, review and predict project risk.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    PROJECT INFORMATION
                ===================================================== */}

                <section className="mt-10 grid gap-6 lg:grid-cols-3">
                    {/* Project overview */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md lg:col-span-2">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <FolderKanban size={19} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Project overview
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    Basic information about this project
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-slate-50 p-5">
                            <p className="text-sm leading-7 text-slate-600">
                                {project.description ||
                                    "No project description has been added yet."}
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <CalendarDays size={19} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Timeline
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    Project schedule
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            <div className="relative pl-5">
                                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-blue-500" />

                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Start date
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {startDate || "Not set"}
                                </p>
                            </div>

                            <div className="relative pl-5">
                                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-slate-300" />

                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Deadline
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {deadline || "Not set"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    PROJECT SETTINGS
                ===================================================== */}

                <section className="mt-10">
                    <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <summary className="flex cursor-pointer list-none items-center justify-between p-6 transition duration-200 hover:bg-slate-50 sm:p-7">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                    <Settings2 size={19} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-slate-900">
                                        Project settings
                                    </h2>

                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Update project information or delete
                                        the project
                                    </p>
                                </div>
                            </div>

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition duration-200 group-open:bg-blue-50 group-open:text-blue-600">
                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-200 group-open:rotate-90"
                                />
                            </div>
                        </summary>

                        <div className="border-t border-slate-200 bg-slate-50/40 p-6 sm:p-7">
                            <form
                                onSubmit={onUpdate}
                                className="space-y-6"
                            >
                                {/* Project name */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Project name
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(event) =>
                                            onNameChange(
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                {/* Description */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Description
                                    </label>

                                    <textarea
                                        value={description}
                                        onChange={(event) =>
                                            onDescriptionChange(
                                                event.target.value
                                            )
                                        }
                                        rows={4}
                                        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>

                                {/* Status + dates */}

                                <div className="grid gap-5 sm:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Status
                                        </label>

                                        <select
                                            value={status}
                                            onChange={(event) =>
                                                onStatusChange(
                                                    event.target
                                                        .value as ProjectStatus
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        >
                                            <option value="ACTIVE">
                                                Active
                                            </option>

                                            <option value="COMPLETED">
                                                Completed
                                            </option>

                                            <option value="ON_HOLD">
                                                On Hold
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Start date
                                        </label>

                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(event) =>
                                                onStartDateChange(
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Deadline
                                        </label>

                                        <input
                                            type="date"
                                            value={deadline}
                                            onChange={(event) =>
                                                onDeadlineChange(
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        />
                                    </div>
                                </div>

                                {/* Actions */}

                                <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                        type="button"
                                        onClick={onDelete}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-red-600 transition duration-200 hover:text-red-700"
                                    >
                                        <Trash2 size={16} />
                                        Delete project
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition duration-200 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : "Save changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </details>
                </section>

                {/* =====================================================
                    BOTTOM SPACING
                ===================================================== */}

                <div className="h-8" />
            </main>
        </div>
    );
}

export default ProjectDetailsView;