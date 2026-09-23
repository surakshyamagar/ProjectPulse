import { Link } from "react-router-dom";
import {
    CheckCircle2,
    CircleAlert,
    ClipboardCheck,
    Lightbulb,
    ShieldCheck,
    XCircle,
} from "lucide-react";

import type {PracticeKey, ProjectPractice, TechnicalReview as TechnicalReviewType} from "../../../types/practice";

interface TechnicalReviewViewProps {
    projectId: string | undefined;
    practices: ProjectPractice[];
    review: TechnicalReviewType | null;
    loading: boolean;
    saving: boolean;
    error: string;
    practiceKeys: PracticeKey[];
    onToggle: (key: PracticeKey) => void;
}

function formatPracticeName(key: PracticeKey) {
    return key
        .split("_")
        .map(
            (word) =>
                word.charAt(0) + word.slice(1).toLowerCase()
        )
        .join(" ");
}

function TechnicalReviewView({
    projectId,
    practices,
    review,
    loading,
    saving,
    error,
    practiceKeys,
    onToggle,
}: TechnicalReviewViewProps) {
    const getPractice = (key: PracticeKey) => {
        return practices.find((practice) => practice.key === key);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-4 w-40 rounded bg-slate-200" />
                        <div className="h-8 w-64 rounded bg-slate-200" />
                        <div className="h-4 w-96 rounded bg-slate-200" />

                        <div className="h-48 rounded-xl bg-white" />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="h-32 rounded-xl bg-white" />
                            <div className="h-32 rounded-xl bg-white" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!review) {
        return (
            <div className="min-h-screen bg-slate-50">
                <main className="mx-auto max-w-7xl px-6 py-10">
                    <div className="mb-2 text-sm font-medium text-blue-600">
                        Project Insights / Technical Review
                    </div>

                    <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <CircleAlert className="mx-auto mb-4 h-9 w-9 text-slate-400" />

                        <h1 className="text-xl font-semibold text-slate-900">
                            No review available
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Technical review data could not be loaded for
                            this project.
                        </p>

                        <Link
                            to={`/projects/${projectId}`}
                            className="mt-6 inline-flex rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Back to Project
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const score = review.score;

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <div className="mb-2 text-sm font-medium text-blue-600">
                        Project Insights / Technical Review
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                            <ClipboardCheck className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">
                                Technical Review
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                Review the project's engineering practices
                                and track which technical safeguards have
                                been implemented.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Score Overview */}
                <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
                    <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
                        <div>
                            <p className="text-sm text-slate-500">
                                Technical Review Score
                            </p>

                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-slate-900">
                                    {score}
                                </span>

                                <span className="text-lg text-slate-400">
                                    /100
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="text-slate-500">
                                    Engineering practices
                                </span>

                                <span className="font-medium text-slate-700">
                                    {review.implementedCount} /{" "}
                                    {review.totalPractices}
                                </span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-blue-600 transition-all"
                                    style={{
                                        width: `${Math.min(
                                            Math.max(score, 0),
                                            100
                                        )}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="rounded-lg border border-blue-100 bg-blue-50 px-5 py-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">
                                {review.implementedCount}
                            </p>

                            <p className="text-xs text-slate-500">
                                Implemented
                            </p>
                        </div>
                    </div>
                </section>

                {/* Engineering Practices */}
                <section className="mb-6">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                            <ShieldCheck className="h-5 w-5 text-slate-600" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Engineering Practices
                            </h2>

                            <p className="text-sm text-slate-500">
                                Track the implementation status of core
                                engineering practices.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {practiceKeys.map((key) => {
                            const practice = getPractice(key);
                            const implemented =
                                practice?.implemented ?? false;

                            return (
                                <div
                                    key={key}
                                    className={`rounded-xl border bg-white p-5 transition ${
                                        implemented
                                            ? "border-emerald-200 hover:border-emerald-300"
                                            : "border-slate-200 hover:border-slate-300"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex min-w-0 gap-3">
                                            <div
                                                className={`mt-0.5 rounded-lg p-2 ${
                                                    implemented
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : "bg-slate-100 text-slate-400"
                                                }`}
                                            >
                                                {implemented ? (
                                                    <CheckCircle2 className="h-5 w-5" />
                                                ) : (
                                                    <XCircle className="h-5 w-5" />
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-slate-900">
                                                    {formatPracticeName(key)}
                                                </h3>

                                                <p
                                                    className={`mt-1 text-xs font-medium ${
                                                        implemented
                                                            ? "text-emerald-600"
                                                            : "text-amber-600"
                                                    }`}
                                                >
                                                    {implemented
                                                        ? "IMPLEMENTED"
                                                        : "NOT IMPLEMENTED"}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={saving}
                                            onClick={() => onToggle(key)}
                                            className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                                implemented
                                                    ? "border-slate-200 text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                    : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                                            }`}
                                        >
                                            {implemented
                                                ? "Mark Missing"
                                                : "Mark Implemented"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Missing Practices */}
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                                <CircleAlert className="h-5 w-5 text-amber-600" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Missing Practices
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Practices that still need implementation.
                                </p>
                            </div>
                        </div>

                        {review.missingPractices.length === 0 ? (
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                                    <p className="text-sm text-emerald-700">
                                        All engineering practices are
                                        implemented.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {review.missingPractices.map((practice) => (
                                    <div
                                        key={practice}
                                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                                    >
                                        <XCircle className="h-4 w-4 shrink-0 text-amber-500" />

                                        <span className="text-sm text-slate-700">
                                            {formatPracticeName(
                                                practice as PracticeKey
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Recommendations */}
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                                <Lightbulb className="h-5 w-5 text-blue-600" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Recommendations
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Suggested engineering improvements.
                                </p>
                            </div>
                        </div>

                        {review.recommendations.length === 0 ? (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                                No recommendations.
                            </div>
                        ) : (
                            <ol className="space-y-3">
                                {review.recommendations.map(
                                    (recommendation, index) => (
                                        <li
                                            key={recommendation}
                                            className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                                                {index + 1}
                                            </span>

                                            <span className="pt-1 text-sm leading-6 text-slate-600">
                                                {recommendation}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default TechnicalReviewView;