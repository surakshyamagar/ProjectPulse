import {
    CheckCircle2,
    CircleAlert,
    Clock3,
    Gauge,
    Lightbulb,
    ShieldAlert,
    Target,
} from "lucide-react";

import type { RiskData } from "../../../types/risk";

interface RiskViewProps {
    data: RiskData | null;
    loading: boolean;
    error: string;
}

function getRiskClasses(riskLevel: string) {
    if (riskLevel === "HIGH") {
        return {
            badge: "border-red-200 bg-red-50 text-red-700",
            icon: "bg-red-50 text-red-600",
        };
    }

    if (riskLevel === "MEDIUM") {
        return {
            badge: "border-amber-200 bg-amber-50 text-amber-700",
            icon: "bg-amber-50 text-amber-600",
        };
    }

    return {
        badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
        icon: "bg-emerald-50 text-emerald-600",
    };
}

function getPriorityClasses(priority: string) {
    if (priority === "HIGH") {
        return "border-red-200 bg-red-50 text-red-700";
    }

    if (priority === "MEDIUM") {
        return "border-amber-200 bg-amber-50 text-amber-700";
    }

    return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

function Metric({
    label,
    value,
    suffix,
}: {
    label: string;
    value: string | number;
    suffix?: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">
                {value}

                {suffix && (
                    <span className="ml-1 text-sm font-normal text-slate-500">
                        {suffix}
                    </span>
                )}
            </p>
        </div>
    );
}

function RiskView({
    data,
    loading,
    error,
}: RiskViewProps) {
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="animate-pulse space-y-6">
                        <div className="h-5 w-40 rounded bg-slate-200" />
                        <div className="h-10 w-64 rounded bg-slate-200" />
                        <div className="h-52 rounded-2xl border border-slate-200 bg-white" />

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="h-80 rounded-2xl border border-slate-200 bg-white" />
                            <div className="h-80 rounded-2xl border border-slate-200 bg-white" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="mb-8">
                        <div className="mb-2 text-sm font-medium text-blue-600">
                            Project Insights / Risk Analysis
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Risk Analysis
                        </h1>
                    </div>

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <CircleAlert
                                size={20}
                                className="mt-0.5 shrink-0 text-red-600"
                            />

                            <div>
                                <h1 className="font-semibold text-red-700">
                                    Failed to load project risk
                                </h1>

                                <p className="mt-1 text-sm text-red-600">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="mb-8">
                        <div className="mb-2 text-sm font-medium text-blue-600">
                            Project Insights / Risk Analysis
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Risk Analysis
                        </h1>
                    </div>

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                            <ShieldAlert size={26} />
                        </div>

                        <h1 className="mb-2 text-xl font-semibold text-slate-900">
                            No risk data available
                        </h1>

                        <p className="text-sm text-slate-500">
                            Risk analysis could not be loaded for this project.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const riskLevel = data.prediction.risk_level;
    const riskClasses = getRiskClasses(riskLevel);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
                        <span>Project Insights</span>
                        <span className="text-slate-300">/</span>
                        <span>Risk Analysis</span>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ShieldAlert size={21} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                Project Risk
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                                ML-based project risk prediction and engineering
                                recommendations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Risk Overview */}
                <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
                        <div className="flex items-start gap-4">
                            <div
                                className={`rounded-xl p-4 ${riskClasses.icon}`}
                            >
                                <ShieldAlert size={28} />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Current Risk
                                </p>

                                <div className="mt-2">
                                    <span
                                        className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold ${riskClasses.badge}`}
                                    >
                                        {riskLevel}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-2 text-sm font-medium text-slate-700">
                                Risk Summary
                            </h2>

                            <p className="max-w-3xl leading-7 text-slate-600">
                                {data.explanation.summary}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Risk Probabilities */}
                <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                            <Target size={18} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Risk Probabilities
                            </h2>

                            <p className="text-sm text-slate-500">
                                Model probability for each risk category.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                            <div className="mb-3 flex justify-between">
                                <span className="text-sm text-slate-600">
                                    High
                                </span>

                                <span className="font-semibold text-red-700">
                                    {data.prediction.probabilities.HIGH}%
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-red-100">
                                <div
                                    className="h-2 rounded-full bg-red-500"
                                    style={{
                                        width: `${data.prediction.probabilities.HIGH}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                            <div className="mb-3 flex justify-between">
                                <span className="text-sm text-slate-600">
                                    Medium
                                </span>

                                <span className="font-semibold text-amber-700">
                                    {data.prediction.probabilities.MEDIUM}%
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-amber-100">
                                <div
                                    className="h-2 rounded-full bg-amber-500"
                                    style={{
                                        width: `${data.prediction.probabilities.MEDIUM}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <div className="mb-3 flex justify-between">
                                <span className="text-sm text-slate-600">
                                    Low
                                </span>

                                <span className="font-semibold text-emerald-700">
                                    {data.prediction.probabilities.LOW}%
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-emerald-100">
                                <div
                                    className="h-2 rounded-full bg-emerald-500"
                                    style={{
                                        width: `${data.prediction.probabilities.LOW}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Risk Factors */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                                <CircleAlert size={18} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Risk Factors
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Factors identified by the current risk
                                    explanation.
                                </p>
                            </div>
                        </div>

                        {data.explanation.riskFactors.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                                <CheckCircle2
                                    size={24}
                                    className="mx-auto mb-3 text-emerald-600"
                                />

                                <p className="text-sm text-slate-500">
                                    No significant risk factors detected.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.explanation.riskFactors.map(
                                    (factor, index) => (
                                        <div
                                            key={`${factor.factor}-${index}`}
                                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <div className="mb-3 flex items-start justify-between gap-3">
                                                <h3 className="font-medium text-slate-900">
                                                    {factor.factor}
                                                </h3>

                                                <span
                                                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${
                                                        getRiskClasses(
                                                            factor.severity
                                                        ).badge
                                                    }`}
                                                >
                                                    {factor.severity}
                                                </span>
                                            </div>

                                            <p className="mb-2 text-xs font-medium text-slate-400">
                                                Value
                                            </p>

                                            <p className="mb-3 text-sm font-semibold text-slate-800">
                                                {factor.value}
                                            </p>

                                            <p className="text-sm leading-6 text-slate-600">
                                                {factor.explanation}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </section>

                    {/* Recommended Actions */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                                <Lightbulb size={18} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Recommended Actions
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Engineering actions based on the current
                                    risk analysis.
                                </p>
                            </div>
                        </div>

                        {data.explanation.recommendedActions.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                                <CheckCircle2
                                    size={24}
                                    className="mx-auto mb-3 text-emerald-600"
                                />

                                <p className="text-sm text-slate-500">
                                    No immediate actions are required.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.explanation.recommendedActions.map(
                                    (action, index) => (
                                        <div
                                            key={`${action.action}-${index}`}
                                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <div className="flex gap-3">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                    <Lightbulb size={14} />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <h3 className="font-medium text-slate-900">
                                                            {action.action}
                                                        </h3>

                                                        <span
                                                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityClasses(
                                                                action.priority
                                                            )}`}
                                                        >
                                                            {action.priority}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm leading-6 text-slate-600">
                                                        {action.reason}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </section>
                </div>

                {/* Risk Analysis Metrics */}
                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                            <Gauge size={18} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Risk Analysis Metrics
                            </h2>

                            <p className="text-sm text-slate-500">
                                Current feature values supplied to the risk
                                analysis.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <Metric
                            label="Project Progress"
                            value={data.features.project_progress.toFixed(1)}
                            suffix="%"
                        />

                        <Metric
                            label="Task Completion"
                            value={data.features.task_completion_rate.toFixed(1)}
                            suffix="%"
                        />

                        <Metric
                            label="Blocked Task Ratio"
                            value={data.features.blocked_task_ratio.toFixed(2)}
                        />

                        <Metric
                            label="Overdue Task Ratio"
                            value={data.features.overdue_task_ratio.toFixed(2)}
                        />

                        <Metric
                            label="Requirement Completion"
                            value={data.features.requirement_completion_rate.toFixed(
                                1
                            )}
                            suffix="%"
                        />

                        <Metric
                            label="Milestone Completion"
                            value={data.features.milestone_completion_rate.toFixed(
                                1
                            )}
                            suffix="%"
                        />

                        <Metric
                            label="Open Issues"
                            value={data.features.open_issue_count}
                        />

                        <Metric
                            label="Critical Issues"
                            value={data.features.critical_issue_count}
                        />

                        <Metric
                            label="API Test Failure Rate"
                            value={(
                                data.features.api_test_failure_rate * 100
                            ).toFixed(1)}
                            suffix="%"
                        />

                        <Metric
                            label="Average API Response Time"
                            value={data.features.avg_api_response_time_ms.toFixed(
                                1
                            )}
                            suffix="ms"
                        />

                        <Metric
                            label="Technical Review Score"
                            value={data.features.technical_review_score}
                            suffix="%"
                        />

                        <Metric
                            label="Days Remaining"
                            value={data.features.days_remaining}
                        />

                        <Metric
                            label="Development Velocity"
                            value={data.features.development_velocity.toFixed(
                                2
                            )}
                        />

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center gap-2">
                                <Clock3
                                    size={14}
                                    className="text-slate-400"
                                />

                                <p className="text-xs font-medium text-slate-400">
                                    Project ID
                                </p>
                            </div>

                            <p className="mt-2 text-lg font-semibold text-slate-900">
                                {data.projectId}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default RiskView;