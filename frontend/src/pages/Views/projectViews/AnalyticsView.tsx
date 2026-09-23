import { Link } from "react-router-dom";
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    CircleAlert,
    Code2,
    ListChecks,
    Milestone,
    Target,
} from "lucide-react";

import type { AnalyticsResponse } from "../../../types/analytics";

interface AnalyticsViewProps {
    projectId: string | undefined;
    analytics: AnalyticsResponse | null;
    loading: boolean;
    error: string;
}

function AnalyticsView({
    projectId,
    analytics,
    loading,
    error,
}: AnalyticsViewProps) {
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-4 w-40 rounded bg-slate-200" />
                        <div className="h-8 w-64 rounded bg-slate-200" />
                        <div className="h-4 w-96 rounded bg-slate-200" />

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="h-36 rounded-xl bg-white" />
                            <div className="h-36 rounded-xl bg-white" />
                            <div className="h-36 rounded-xl bg-white" />
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="h-72 rounded-xl bg-white" />
                            <div className="h-72 rounded-xl bg-white" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="mb-2 text-sm font-medium text-blue-600">
                        Project Insights / Analytics
                    </div>

                    <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>

                    <Link
                        to={`/projects/${projectId}`}
                        className="mt-5 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Back to Project
                    </Link>
                </div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="mb-2 text-sm font-medium text-blue-600">
                        Project Insights / Analytics
                    </div>

                    <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <Activity className="mx-auto mb-4 h-10 w-10 text-slate-400" />

                        <h2 className="text-lg font-semibold text-slate-900">
                            No analytics available
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Analytics could not be loaded for this project.
                        </p>

                        <Link
                            to={`/projects/${projectId}`}
                            className="mt-6 inline-flex rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Back to Project
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const healthStatus = analytics.health.status;

    const healthStyle =
        healthStatus === "HEALTHY"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : healthStatus === "WARNING"
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-red-200 bg-red-50 text-red-700";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="mb-2 text-sm font-medium text-blue-600">
                        Project Insights / Analytics
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                            <Activity className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">
                                Project Analytics
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Track project progress, requirements,
                                milestones, tasks, issues, API tests, and
                                overall project health.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Project Overview */}
                <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-slate-500">Project</p>

                            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                                {analytics.project.name}
                            </h2>
                        </div>

                        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                            {analytics.project.status}
                        </span>
                    </div>
                </section>

                {/* Summary Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <Target className="h-5 w-5 text-blue-600" />

                            <span className="text-sm text-slate-500">
                                Project Progress
                            </span>
                        </div>

                        <p className="mt-4 text-3xl font-bold text-slate-900">
                            {analytics.progress.projectProgress}%
                        </p>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-blue-600"
                                style={{
                                    width: `${Math.min(
                                        analytics.progress.projectProgress,
                                        100
                                    )}%`,
                                }}
                            />
                        </div>

                        <p className="mt-3 text-sm text-slate-500">
                            {analytics.progress.completedTasks} /{" "}
                            {analytics.progress.totalTasks} tasks completed
                        </p>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                            <span className="text-sm text-slate-500">
                                Requirements
                            </span>
                        </div>

                        <p className="mt-4 text-3xl font-bold text-slate-900">
                            {analytics.requirements.completionRate}%
                        </p>

                        <p className="mt-3 text-sm text-slate-500">
                            {analytics.requirements.completed} /{" "}
                            {analytics.requirements.total} completed
                        </p>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <Milestone className="h-5 w-5 text-purple-600" />

                            <span className="text-sm text-slate-500">
                                Milestones
                            </span>
                        </div>

                        <p className="mt-4 text-3xl font-bold text-slate-900">
                            {analytics.milestones.completionRate}%
                        </p>

                        <p className="mt-3 text-sm text-slate-500">
                            {analytics.milestones.completed} /{" "}
                            {analytics.milestones.total} completed
                        </p>
                    </section>
                </div>

                {/* Analytics Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Tasks */}
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <ListChecks className="h-5 w-5 text-blue-600" />

                            <h2 className="font-semibold text-slate-900">
                                Task Analytics
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <Metric
                                label="Total"
                                value={analytics.tasks.total}
                            />

                            <Metric
                                label="Completed"
                                value={analytics.tasks.completed}
                            />

                            <Metric
                                label="In Progress"
                                value={analytics.tasks.inProgress}
                            />

                            <Metric
                                label="TODO"
                                value={analytics.tasks.todo}
                            />

                            <Metric
                                label="Blocked"
                                value={analytics.tasks.blocked}
                                danger={analytics.tasks.blocked > 0}
                            />

                            <Metric
                                label="Overdue"
                                value={analytics.tasks.overdue}
                                danger={analytics.tasks.overdue > 0}
                            />
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <span className="text-sm text-slate-500">
                                Completion Rate
                            </span>

                            <p className="mt-1 text-xl font-semibold text-slate-900">
                                {analytics.tasks.completionRate}%
                            </p>
                        </div>
                    </section>

                    {/* Issues */}
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <CircleAlert className="h-5 w-5 text-red-600" />

                            <h2 className="font-semibold text-slate-900">
                                Issue Analytics
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <Metric
                                label="Total"
                                value={analytics.issues.total}
                            />

                            <Metric
                                label="Open"
                                value={analytics.issues.open}
                                danger={analytics.issues.open > 0}
                            />

                            <Metric
                                label="In Progress"
                                value={analytics.issues.inProgress}
                            />

                            <Metric
                                label="Resolved"
                                value={analytics.issues.resolved}
                            />

                            <Metric
                                label="Closed"
                                value={analytics.issues.closed}
                            />

                            <Metric
                                label="Critical"
                                value={analytics.issues.critical}
                                danger={analytics.issues.critical > 0}
                            />
                        </div>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <span className="text-sm text-slate-500">
                                High Priority Issues
                            </span>

                            <p className="mt-1 text-xl font-semibold text-orange-600">
                                {analytics.issues.high}
                            </p>
                        </div>
                    </section>

                    {/* API Tests */}
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <Code2 className="h-5 w-5 text-blue-600" />

                            <h2 className="font-semibold text-slate-900">
                                API Test Analytics
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <Metric
                                label="Total"
                                value={analytics.apiTests.total}
                            />

                            <Metric
                                label="Passed"
                                value={analytics.apiTests.passed}
                            />

                            <Metric
                                label="Failed"
                                value={analytics.apiTests.failed}
                                danger={analytics.apiTests.failed > 0}
                            />

                            <Metric
                                label="Failure Rate"
                                value={`${analytics.apiTests.failureRate}%`}
                            />

                            <Metric
                                label="Avg. Response"
                                value={`${analytics.apiTests.averageResponseTime} ms`}
                            />
                        </div>
                    </section>

                    {/* Technical Review */}
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-purple-600" />

                            <h2 className="font-semibold text-slate-900">
                                Technical Review
                            </h2>
                        </div>

                        {analytics.technicalReview.score === null ? (
                            <p className="text-sm leading-6 text-slate-500">
                                Technical review will be available after
                                engineering practices are implemented.
                            </p>
                        ) : (
                            <>
                                <p className="text-4xl font-bold text-slate-900">
                                    {analytics.technicalReview.score}
                                    <span className="text-lg text-slate-400">
                                        /100
                                    </span>
                                </p>

                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-purple-600"
                                        style={{
                                            width: `${Math.min(
                                                analytics.technicalReview
                                                    .score,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </section>
                </div>

                {/* Project Health */}
                <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Activity className="h-5 w-5 text-blue-600" />

                            <h2 className="font-semibold text-slate-900">
                                Project Health
                            </h2>
                        </div>

                        <span
                            className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${healthStyle}`}
                        >
                            {healthStatus}
                        </span>
                    </div>

                    {analytics.health.reasons.length === 0 ? (
                        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                            <CheckCircle2 className="h-5 w-5" />
                            No current risk indicators.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-slate-700">
                                Health Indicators
                            </p>

                            {analytics.health.reasons.map((reason) => (
                                <div
                                    key={reason}
                                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                                >
                                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                                    <span className="text-sm text-slate-600">
                                        {reason}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

function Metric({
    label,
    value,
    danger = false,
}: {
    label: string;
    value: string | number;
    danger?: boolean;
}) {
    return (
        <div className="rounded-lg bg-slate-50 p-3">
            <span className="block text-xs text-slate-500">
                {label}
            </span>

            <strong
                className={`mt-1 block text-lg ${
                    danger ? "text-red-600" : "text-slate-900"
                }`}
            >
                {value}
            </strong>
        </div>
    );
}

export default AnalyticsView;