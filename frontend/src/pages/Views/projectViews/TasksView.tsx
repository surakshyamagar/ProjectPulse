import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Circle,
    ListTodo,
    Plus,
    Trash2,
    TriangleAlert,
} from "lucide-react";

import type {Task,TaskPriority,TaskStatus,} from "../../../types/task";

interface TasksViewProps {
    tasks: Task[];

    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string;

    loading: boolean;
    saving: boolean;
    error: string;

    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onPriorityChange: (value: TaskPriority) => void;
    onDueDateChange: (value: string) => void;

    onCreate: () => void;
    onStatusChange: (
        task: Task,
        status: TaskStatus
    ) => void;
    onTaskPriorityChange: (
        task: Task,
        priority: TaskPriority
    ) => void;
    onDelete: (id: number) => void;
}

const TasksView = ({
    tasks,
    title,
    description,
    priority,
    dueDate,
    loading,
    saving,
    error,
    onTitleChange,
    onDescriptionChange,
    onPriorityChange,
    onDueDateChange,
    onCreate,
    onStatusChange,
    onTaskPriorityChange,
    onDelete,
}: TasksViewProps) => {
    const openDatePicker = (
        event: React.MouseEvent<HTMLInputElement>
    ) => {
        const input = event.currentTarget;

        if (typeof input.showPicker === "function") {
            input.showPicker();
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-sm text-slate-500">
                    Loading tasks...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <Link
                        to="/projects"
                        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>

                    <div className="text-sm font-medium text-blue-600">
                        Development / Milestones / Tasks
                    </div>

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">
                                Project Tasks
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Break this milestone into actionable
                                development tasks and track their progress.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                            <ListTodo className="h-4 w-4 text-blue-600" />

                            <span className="text-sm font-medium text-slate-700">
                                {tasks.length}{" "}
                                {tasks.length === 1 ? "task" : "tasks"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Back to Milestones */}
                <div className="mb-6">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Milestones
                    </Link>
                </div>

                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                    {/* Create Task */}
                    <section className="h-fit rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-6">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                                <Plus className="h-5 w-5 text-blue-600" />
                            </div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Add Task
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-slate-500">
                                Create an actionable task for this milestone.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Task title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        onTitleChange(e.target.value)
                                    }
                                    placeholder="e.g. Create login API"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        onDescriptionChange(e.target.value)
                                    }
                                    placeholder="Describe what needs to be implemented..."
                                    rows={4}
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Priority
                                </label>

                                <select
                                    value={priority}
                                    onChange={(e) =>
                                        onPriorityChange(
                                            e.target.value as TaskPriority
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Due date
                                </label>

                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) =>
                                        onDueDateChange(e.target.value)
                                    }
                                    onClick={openDatePicker}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={onCreate}
                                disabled={saving}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Plus className="h-4 w-4" />

                                {saving ? "Creating..." : "Create Task"}
                            </button>
                        </div>
                    </section>

                    {/* Task List */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Development Tasks
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Track the implementation work required for
                                this milestone.
                            </p>
                        </div>

                        {tasks.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                                <ListTodo className="mx-auto h-8 w-8 text-slate-400" />

                                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                                    No tasks yet
                                </h3>

                                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                                    Create the first development task for this
                                    milestone to start the implementation
                                    work.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="flex min-w-0 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onStatusChange(
                                                            task,
                                                            task.status ===
                                                                "COMPLETED"
                                                                ? "TODO"
                                                                : "COMPLETED"
                                                        )
                                                    }
                                                    className="mt-0.5 shrink-0 text-slate-400 transition hover:text-blue-600"
                                                    title={
                                                        task.status ===
                                                        "COMPLETED"
                                                            ? "Mark as todo"
                                                            : "Mark as completed"
                                                    }
                                                >
                                                    {task.status ===
                                                    "COMPLETED" ? (
                                                        <Circle className="h-5 w-5 fill-blue-100 text-blue-600" />
                                                    ) : (
                                                        <Circle className="h-5 w-5" />
                                                    )}
                                                </button>

                                                <div className="min-w-0">
                                                    <h3
                                                        className={`font-medium ${
                                                            task.status ===
                                                            "COMPLETED"
                                                                ? "text-slate-400 line-through"
                                                                : "text-slate-900"
                                                        }`}
                                                    >
                                                        {task.title}
                                                    </h3>

                                                    <p className="mt-1 text-sm leading-5 text-slate-500">
                                                        {task.description ||
                                                            "No description provided."}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2">
                                                <select
                                                    value={task.priority}
                                                    onChange={(e) =>
                                                        onTaskPriorityChange(
                                                            task,
                                                            e.target
                                                                .value as TaskPriority
                                                        )
                                                    }
                                                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-600 outline-none focus:border-blue-500"
                                                >
                                                    <option value="LOW">
                                                        Low
                                                    </option>

                                                    <option value="MEDIUM">
                                                        Medium
                                                    </option>

                                                    <option value="HIGH">
                                                        High
                                                    </option>
                                                </select>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onDelete(task.id)
                                                    }
                                                    className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                                                    title="Delete task"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
                                                {task.status}
                                            </span>

                                            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
                                                {task.priority}
                                            </span>

                                            {task.dueDate && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <CalendarDays className="h-3.5 w-3.5" />
                                                    Due{" "}
                                                    {new Date(
                                                        task.dueDate
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* Workflow Context */}
                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-600">
                                Development stage
                            </p>

                            <h2 className="mt-1 text-lg font-semibold text-slate-900">
                                Ready to build and test?
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Once your tasks are defined, continue with
                                development work, issues, and API testing.
                            </p>
                        </div>

                        <Link
                            to="/projects"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TasksView;