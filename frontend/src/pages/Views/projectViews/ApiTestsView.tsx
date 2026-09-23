import {
    Activity,
    CheckCircle2,
    Clock3,
    Plus,
    XCircle,
} from "lucide-react";

import type { ApiTest } from "../../../types/apiTest";

interface ApiTestsViewProps {
    apiTests: ApiTest[];

    endpoint: string;
    method: string;
    statusCode: number;
    passed: boolean;
    responseTime: number;

    loading: boolean;
    saving: boolean;
    error: string;

    onEndpointChange: (value: string) => void;
    onMethodChange: (value: string) => void;
    onStatusCodeChange: (value: number) => void;
    onPassedChange: (value: boolean) => void;
    onResponseTimeChange: (value: number) => void;

    onCreate: (
        event: React.FormEvent<HTMLFormElement>
    ) => void;
}

function ApiTestsView({
    apiTests,
    endpoint,
    method,
    statusCode,
    passed,
    responseTime,
    loading,
    saving,
    error,
    onEndpointChange,
    onMethodChange,
    onStatusCodeChange,
    onPassedChange,
    onResponseTimeChange,
    onCreate,
}: ApiTestsViewProps) {
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
                        <span>API Testing</span>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Activity size={21} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    API Testing
                                </h1>

                                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                                    Record API test results and monitor
                                    endpoint performance throughout
                                    development.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                Test History
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                                {apiTests.length}{" "}
                                {apiTests.length === 1 ? "Test" : "Tests"}
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
                    {/* Record API Test */}
                    <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="mb-6">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Plus size={20} />
                            </div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Record API Test
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Add a new test result for an API endpoint.
                            </p>
                        </div>

                        <form onSubmit={onCreate} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Endpoint
                                </label>

                                <input
                                    type="text"
                                    placeholder="/api/auth/login"
                                    value={endpoint}
                                    onChange={(event) =>
                                        onEndpointChange(
                                            event.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Method
                                </label>

                                <select
                                    value={method}
                                    onChange={(event) =>
                                        onMethodChange(event.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="PATCH">PATCH</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Status Code
                                </label>

                                <input
                                    type="number"
                                    value={statusCode}
                                    onChange={(event) =>
                                        onStatusCodeChange(
                                            Number(event.target.value)
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Result
                                </label>

                                <select
                                    value={passed ? "true" : "false"}
                                    onChange={(event) =>
                                        onPassedChange(
                                            event.target.value === "true"
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="true">PASSED</option>
                                    <option value="false">FAILED</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Response Time (ms)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={responseTime}
                                    onChange={(event) =>
                                        onResponseTimeChange(
                                            Number(event.target.value)
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Plus size={17} />

                                {saving
                                    ? "Saving..."
                                    : "Record API Test"}
                            </button>
                        </form>
                    </section>

                    {/* History */}
                    <section className="lg:col-span-3">
                        <div className="mb-5">
                            <p className="text-sm font-medium text-blue-600">
                                Development Validation
                            </p>

                            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                                API Test History
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Review recorded endpoint results and response
                                performance.
                            </p>
                        </div>

                        {apiTests.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                    <Activity size={24} />
                                </div>

                                <h3 className="mb-2 text-base font-medium text-slate-900">
                                    No API tests recorded
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Record your first API test using the form
                                    to start tracking endpoint behaviour.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {apiTests.map((test) => (
                                    <article
                                        key={test.id}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
                                    >
                                        <div className="mb-4 flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                                    <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600">
                                                        {test.method}
                                                    </span>

                                                    <h3 className="break-all font-semibold text-slate-900">
                                                        {test.endpoint}
                                                    </h3>
                                                </div>
                                            </div>

                                            {test.passed ? (
                                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                                    <CheckCircle2 size={14} />
                                                    PASSED
                                                </span>
                                            ) : (
                                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                                                    <XCircle size={14} />
                                                    FAILED
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-xs text-slate-400">
                                                    Status Code
                                                </p>

                                                <p className="mt-1 font-semibold text-slate-900">
                                                    {test.statusCode}
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock3
                                                        size={13}
                                                        className="text-slate-400"
                                                    />

                                                    <p className="text-xs text-slate-400">
                                                        Response Time
                                                    </p>
                                                </div>

                                                <p className="mt-1 font-semibold text-slate-900">
                                                    {test.responseTime} ms
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-xs text-slate-400">
                                                    Tested
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-slate-700">
                                                    {new Date(
                                                        test.testedAt
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default ApiTestsView;