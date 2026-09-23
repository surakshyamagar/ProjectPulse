import {CheckCircle2, CircleAlert, Lightbulb, Target} from "lucide-react";
import type { RecommendationData } from "../../../services/projects/recommendationService";

interface RecommendationsViewProps {
    data: RecommendationData | null;
    loading: boolean;
    error: string;
}

function RecommendationsView({
    data,
    loading,
    error,
}: RecommendationsViewProps) {
    const getRiskClasses = (riskLevel: string) => {
        if (riskLevel === "HIGH") {
            return {
                badge: "bg-red-50 text-red-700 border-red-200",
                icon: "bg-red-50 text-red-600",
            };
        }

        if (riskLevel === "MEDIUM") {
            return {
                badge: "bg-amber-50 text-amber-700 border-amber-200",
                icon: "bg-amber-50 text-amber-600",
            };
        }

        return {
            badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
            icon: "bg-emerald-50 text-emerald-600",
        };
    };

    const getPriorityClasses = (priority: string) => {
        if (priority === "HIGH") {
            return "bg-red-50 text-red-700 border-red-200";
        }

        if (priority === "MEDIUM") {
            return "bg-amber-50 text-amber-700 border-amber-200";
        }

        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="animate-pulse space-y-6">
                        <div className="h-5 w-40 rounded bg-slate-200" />
                        <div className="h-10 w-72 rounded bg-slate-200" />

                        <div className="h-48 rounded-2xl border border-slate-200 bg-white" />

                        <div className="grid gap-6 md:grid-cols-2">
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
                            Project Insights / Recommendations
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Recommended Actions
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
                                    Failed to load recommendations
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
                            Project Insights / Recommendations
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Recommended Actions
                        </h1>
                    </div>

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                            <Lightbulb size={26} />
                        </div>

                        <h1 className="mb-2 text-xl font-semibold text-slate-900">
                            No recommendations available
                        </h1>

                        <p className="text-sm text-slate-500">
                            There are currently no recommendation results for
                            this project.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const riskClasses = getRiskClasses(data.riskLevel);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
                        <span>Project Insights</span>
                        <span className="text-slate-300">/</span>
                        <span>Recommendations</span>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Lightbulb size={21} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                Recommended Actions
                            </h1>

                            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                                ML-based recommendations generated from the
                                project's current risk prediction and SHAP
                                risk factors.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Current Risk */}
                <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                        <div className="flex items-start gap-4">
                            <div
                                className={`rounded-xl p-3 ${riskClasses.icon}`}
                            >
                                <CircleAlert size={24} />
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Current Risk
                                </p>

                                <div className="mt-2">
                                    <span
                                        className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${riskClasses.badge}`}
                                    >
                                        {data.riskLevel}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <Target
                                    size={17}
                                    className="text-slate-400"
                                />

                                <h2 className="font-semibold text-slate-900">
                                    Risk Probabilities
                                </h2>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                                    <div className="mb-2 flex justify-between">
                                        <span className="text-sm text-slate-600">
                                            High
                                        </span>

                                        <span className="font-semibold text-red-700">
                                            {data.probabilities.HIGH}%
                                        </span>
                                    </div>

                                    <div className="h-2 rounded-full bg-red-100">
                                        <div
                                            className="h-2 rounded-full bg-red-500"
                                            style={{
                                                width: `${data.probabilities.HIGH}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                                    <div className="mb-2 flex justify-between">
                                        <span className="text-sm text-slate-600">
                                            Medium
                                        </span>

                                        <span className="font-semibold text-amber-700">
                                            {data.probabilities.MEDIUM}%
                                        </span>
                                    </div>

                                    <div className="h-2 rounded-full bg-amber-100">
                                        <div
                                            className="h-2 rounded-full bg-amber-500"
                                            style={{
                                                width: `${data.probabilities.MEDIUM}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                    <div className="mb-2 flex justify-between">
                                        <span className="text-sm text-slate-600">
                                            Low
                                        </span>

                                        <span className="font-semibold text-emerald-700">
                                            {data.probabilities.LOW}%
                                        </span>
                                    </div>

                                    <div className="h-2 rounded-full bg-emerald-100">
                                        <div
                                            className="h-2 rounded-full bg-emerald-500"
                                            style={{
                                                width: `${data.probabilities.LOW}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* ML Risk Factors */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                                <Target size={18} />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    ML Risk Factors
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Factors identified from the current risk
                                    analysis.
                                </p>
                            </div>
                        </div>

                        {data.riskFactors.length === 0 ? (
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
                                {data.riskFactors.map((factor, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div className="mb-3 flex items-start justify-between gap-3">
                                            <h3 className="font-medium text-slate-900">
                                                {factor.factor}
                                            </h3>

                                            <span
                                                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${getRiskClasses(
                                                    factor.severity
                                                ).badge}`}
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
                                ))}
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
                                    What Should I Do Next?
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Actions based on the current ML analysis.
                                </p>
                            </div>
                        </div>

                        {data.recommendations.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                                <CheckCircle2
                                    size={24}
                                    className="mx-auto mb-3 text-emerald-600"
                                />

                                <p className="text-sm text-slate-500">
                                    No immediate actions are recommended by the
                                    ML analysis.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {data.recommendations.map(
                                    (recommendation, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <div className="flex gap-3">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                                                    {index + 1}
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <h3 className="font-medium text-slate-900">
                                                            {
                                                                recommendation.action
                                                            }
                                                        </h3>

                                                        <span
                                                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityClasses(
                                                                recommendation.priority
                                                            )}`}
                                                        >
                                                            {
                                                                recommendation.priority
                                                            }
                                                        </span>
                                                    </div>

                                                    <p className="text-sm leading-6 text-slate-600">
                                                        {
                                                            recommendation.reason
                                                        }
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
            </main>
        </div>
    );
}

export default RecommendationsView;