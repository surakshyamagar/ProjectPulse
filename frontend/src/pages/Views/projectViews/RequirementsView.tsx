import {
    CheckCircle2,
    Circle,
    ClipboardList,
    Clock3,
    Plus,
    Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import type {Requirement, RequirementStatus} from "../../../types/requirement";

interface RequirementsViewProps {
    requirements: Requirement[];
    loading: boolean;
    error: string;

    title: string;
    description: string;

    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;

    onCreate: (event: React.FormEvent<HTMLFormElement>) => void;
    onUpdateStatus: (id: number, status: RequirementStatus) => void;
    onDelete: (id: number) => void;

    projectId: number;
}

function RequirementsView({
    requirements,
    loading,
    error,
    title,
    description,
    onTitleChange,
    onDescriptionChange,
    onCreate,
    onUpdateStatus,
    onDelete,
    projectId,
}: RequirementsViewProps) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page Header */}
                <header className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
                        <span>Development</span>
                        <span className="text-slate-300">/</span>
                        <span>Requirements</span>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <ClipboardList size={21} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Project Requirements
                                </h1>

                                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                                    Define and track the functional and technical
                                    requirements needed to build your project.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Requirements
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                                {requirements.length}{" "}
                                {requirements.length === 1
                                    ? "Requirement"
                                    : "Requirements"}
                            </p>
                        </div>
                    </div>
                </header>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Create Requirement */}
                    <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="mb-6">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Plus size={20} />
                            </div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Add Requirement
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Define a requirement that will guide the
                                development of your project.
                            </p>
                        </div>

                        <form onSubmit={onCreate} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(event) =>
                                        onTitleChange(event.target.value)
                                    }
                                    placeholder="User authentication"
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
                                        onDescriptionChange(event.target.value)
                                    }
                                    placeholder="Describe what this requirement should accomplish..."
                                    rows={4}
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                <Plus size={17} />
                                Add Requirement
                            </button>
                        </form>
                    </section>

                    {/* Requirement List */}
                    <section className="lg:col-span-3">
                        <div className="mb-5">
                            <p className="text-sm font-medium text-blue-600">
                                Project Definition
                            </p>

                            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                                Requirements
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Track the progress of each requirement as the
                                project moves toward development.
                            </p>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white"
                                    />
                                ))}
                            </div>
                        ) : requirements.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                    <ClipboardList size={24} />
                                </div>

                                <h3 className="mb-2 text-base font-medium text-slate-900">
                                    No requirements added
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Add your first requirement to begin defining
                                    the project.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {requirements.map((requirement) => (
                                    <article
                                        key={requirement.id}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-slate-900">
                                                    {requirement.title}
                                                </h3>

                                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                                    {requirement.description ||
                                                        "No description provided."}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDelete(requirement.id)
                                                }
                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                title="Delete requirement"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                            <div className="flex items-center gap-2">
                                                {requirement.status ===
                                                "COMPLETED" ? (
                                                    <CheckCircle2
                                                        size={16}
                                                        className="text-emerald-600"
                                                    />
                                                ) : requirement.status ===
                                                  "IN_PROGRESS" ? (
                                                    <Clock3
                                                        size={16}
                                                        className="text-amber-600"
                                                    />
                                                ) : (
                                                    <Circle
                                                        size={16}
                                                        className="text-slate-400"
                                                    />
                                                )}

                                                <select
                                                    value={requirement.status}
                                                    onChange={(event) =>
                                                        onUpdateStatus(
                                                            requirement.id,
                                                            event.target
                                                                .value as RequirementStatus
                                                        )
                                                    }
                                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                >
                                                    <option value="TODO">
                                                        TODO
                                                    </option>

                                                    <option value="IN_PROGRESS">
                                                        IN PROGRESS
                                                    </option>

                                                    <option value="COMPLETED">
                                                        COMPLETED
                                                    </option>
                                                </select>
                                            </div>
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
                                Plan Your Milestones
                            </h3>

                            <p className="mt-1 text-sm text-slate-600">
                                Once the project requirements are defined,
                                organize the work into milestones.
                            </p>
                        </div>

                        <Link
                            to={`/projects/${projectId}/milestones`}
                            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Continue to Milestones
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default RequirementsView;