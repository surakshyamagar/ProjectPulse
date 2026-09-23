import { Link } from "react-router-dom";
import {
    CalendarRange,
    CheckCircle2,
    Edit3,
    Flag,
    Plus,
    Trash2,
} from "lucide-react";

import type { Milestone } from "../../../types/milestone";

interface MilestonesViewProps {
    milestones: Milestone[];

    name: string;
    description: string;

    loading: boolean;
    saving: boolean;
    error: string;

    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onCreate: () => void;
    onUpdate: (milestone: Milestone) => void;
    onDelete: (id: number) => void;
}

const MilestonesView = ({
    milestones,
    name,
    description,
    loading,
    saving,
    error,
    onNameChange,
    onDescriptionChange,
    onCreate,
    onUpdate,
    onDelete,
}: MilestonesViewProps) => {
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="animate-pulse space-y-6">
                        <div className="h-5 w-40 rounded bg-slate-200" />
                        <div className="h-10 w-64 rounded bg-slate-200" />

                        <div className="grid gap-6 lg:grid-cols-5">
                            <div className="h-96 rounded-2xl border border-slate-200 bg-white lg:col-span-2" />
                            <div className="h-96 rounded-2xl border border-slate-200 bg-white lg:col-span-3" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page Header */}
                <header className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
                        <span>Development</span>
                        <span className="text-slate-300">/</span>
                        <span>Milestones</span>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Flag size={21} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Plan Your Milestones
                                </h1>

                                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                                    Break the project into meaningful delivery
                                    stages and organize the work that needs to
                                    be completed.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Milestones
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                                {milestones.length}{" "}
                                {milestones.length === 1
                                    ? "Milestone"
                                    : "Milestones"}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Create Milestone */}
                    <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="mb-6">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Plus size={20} />
                            </div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Add Milestone
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Create a delivery stage for your project.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Milestone Name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        onNameChange(event.target.value)
                                    }
                                    placeholder="e.g. Authentication"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

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
                                    placeholder="Describe what this milestone should deliver..."
                                    rows={5}
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={onCreate}
                                disabled={saving}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Plus size={17} />

                                {saving
                                    ? "Creating..."
                                    : "Create Milestone"}
                            </button>
                        </div>
                    </section>

                    {/* Milestone List */}
                    <section className="lg:col-span-3">
                        <div className="mb-5">
                            <p className="text-sm font-medium text-blue-600">
                                Development Planning
                            </p>

                            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                                Project Roadmap
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage the stages that organize your
                                development work.
                            </p>
                        </div>

                        {milestones.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                    <CalendarRange size={24} />
                                </div>

                                <h3 className="mb-2 text-base font-medium text-slate-900">
                                    No milestones yet
                                </h3>

                                <p className="mx-auto max-w-sm text-sm text-slate-500">
                                    Create your first milestone to start
                                    organizing the project development plan.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {milestones.map((milestone, index) => (
                                    <article
                                        key={milestone.id}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex min-w-0 gap-4">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue-600">
                                                    {index + 1}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                        Milestone {index + 1}
                                                    </p>

                                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                                        <h3 className="font-semibold text-slate-900">
                                                            {milestone.name}
                                                        </h3>

                                                        {milestone.completed ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                                Completed
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                                In Progress
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                                        {milestone.description ||
                                                            "No description provided."}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onUpdate(milestone)
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onDelete(milestone.id)
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <CalendarRange size={15} />
                                                Development stage
                                            </div>

                                            <Link
                                                to={`/milestones/${milestone.id}/tasks`}
                                                className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                            >
                                                Manage Tasks
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* Next Stage */}
                <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                                Next Stage
                            </p>

                            <h3 className="mt-1 text-lg font-semibold text-slate-900">
                                Start Development
                            </h3>

                            <p className="mt-1 text-sm text-slate-600">
                                Create tasks for your milestones and begin
                                executing the development work.
                            </p>
                        </div>

                        {milestones.length > 0 ? (
                            <Link
                                to={`/milestones/${milestones[0].id}/tasks`}
                                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Continue to Tasks
                            </Link>
                        ) : (
                            <span className="inline-flex shrink-0 cursor-not-allowed items-center justify-center rounded-xl bg-slate-300 px-5 py-3 text-sm font-medium text-slate-500">
                                Create a Milestone First
                            </span>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MilestonesView;