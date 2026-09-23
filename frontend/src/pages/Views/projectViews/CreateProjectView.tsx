import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    FileText,
    FolderPlus,
    Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { FormEvent, MouseEvent } from "react";

import type { ProjectStatus } from "../../../types/project";

interface CreateProjectViewProps {
    name: string;
    description: string;
    status: ProjectStatus;
    startDate: string;
    deadline: string;
    loading: boolean;
    error: string;

    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onStatusChange: (value: ProjectStatus) => void;
    onStartDateChange: (value: string) => void;
    onDeadlineChange: (value: string) => void;

    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function openDatePicker(event: MouseEvent<HTMLButtonElement>) {
    const input =
        event.currentTarget.parentElement?.querySelector("input");

    if (input instanceof HTMLInputElement) {
        input.showPicker?.();
        input.focus();
    }
}

function CreateProjectView({
    name,
    description,
    status,
    startDate,
    deadline,
    loading,
    error,
    onNameChange,
    onDescriptionChange,
    onStatusChange,
    onStartDateChange,
    onDeadlineChange,
    onSubmit,
}: CreateProjectViewProps) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform group-hover:-translate-x-0.5"
                        />
                        Back to Projects
                    </Link>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <FolderPlus size={16} />
                        </div>

                        <span className="hidden sm:block">
                            ProjectPulse
                        </span>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
                {/* Page heading */}
                <div className="mb-10">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                        <Sparkles size={13} />
                        New project
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Create a new project
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                        Set up the foundation for your software project.
                        You can define requirements, milestones, tasks,
                        testing, analytics, and project intelligence after
                        creation.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
                    {/* Main form */}
                    <form
                        onSubmit={onSubmit}
                        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        {/* Form header */}
                        <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <FileText size={20} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Project details
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Provide the basic information for
                                        your project.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form fields */}
                        <div className="space-y-7 px-6 py-7 sm:px-8">
                            {/* Project name */}
                            <div>
                                <label
                                    htmlFor="project-name"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Project name
                                </label>

                                <input
                                    id="project-name"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        onNameChange(event.target.value)
                                    }
                                    placeholder="e.g. FoodFlow"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                                <p className="mt-2 text-xs text-slate-400">
                                    Choose a clear name that identifies your
                                    software project.
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="project-description"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="project-description"
                                    value={description}
                                    onChange={(event) =>
                                        onDescriptionChange(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Describe what you are building, the problem it solves, and its main purpose..."
                                    rows={5}
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                                <p className="mt-2 text-xs text-slate-400">
                                    A short description helps provide context
                                    throughout the project workspace.
                                </p>
                            </div>

                            {/* Status */}
                            <div>
                                <label
                                    htmlFor="project-status"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Initial status
                                </label>

                                <select
                                    id="project-status"
                                    value={status}
                                    onChange={(event) =>
                                        onStatusChange(
                                            event.target
                                                .value as ProjectStatus
                                        )
                                    }
                                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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

                                <p className="mt-2 text-xs text-slate-400">
                                    You can change the project status later
                                    from project settings.
                                </p>
                            </div>

                            {/* Dates */}
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Start date */}
                                <div>
                                    <label
                                        htmlFor="start-date"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Start date
                                    </label>

                                    <div className="relative">
                                        <CalendarDays
                                            size={17}
                                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="start-date"
                                            type="date"
                                            value={startDate}
                                            onChange={(event) =>
                                                onStartDateChange(
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={openDatePicker}
                                            aria-label="Open start date calendar"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                                        >
                                            <CalendarDays size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Deadline */}
                                <div>
                                    <label
                                        htmlFor="deadline"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Deadline
                                    </label>

                                    <div className="relative">
                                        <CalendarDays
                                            size={17}
                                            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="deadline"
                                            type="date"
                                            value={deadline}
                                            onChange={(event) =>
                                                onDeadlineChange(
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={openDatePicker}
                                            aria-label="Open deadline calendar"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                                        >
                                            <CalendarDays size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mx-6 mb-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:mx-8">
                                <p className="text-sm font-medium text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">
                            <Link
                                to="/projects"
                                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FolderPlus size={17} />

                                {loading
                                    ? "Creating project..."
                                    : "Create project"}
                            </button>
                        </div>
                    </form>

                    {/* Right information panel */}
                    <aside className="space-y-4">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <CheckCircle2 size={19} />
                            </div>

                            <h3 className="font-semibold text-slate-900">
                                What happens next?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                After creating the project, ProjectPulse
                                provides a structured workspace for managing
                                the complete development lifecycle.
                            </p>

                            <div className="mt-5 space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                                        1
                                    </span>

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Define requirements
                                        </p>

                                        <p className="mt-0.5 text-xs leading-5 text-slate-400">
                                            Capture what the software needs
                                            to accomplish.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                                        2
                                    </span>

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Plan development
                                        </p>

                                        <p className="mt-0.5 text-xs leading-5 text-slate-400">
                                            Organize milestones and
                                            development tasks.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                                        3
                                    </span>

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Track project health
                                        </p>

                                        <p className="mt-0.5 text-xs leading-5 text-slate-400">
                                            Monitor progress, issues, testing,
                                            and project risk.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                                <Sparkles size={16} />
                                ProjectPulse intelligence
                            </div>

                            <p className="mt-2 text-sm leading-6 text-blue-700/70">
                                Project analytics, technical review, and risk
                                prediction become available as you build out
                                the project.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default CreateProjectView;