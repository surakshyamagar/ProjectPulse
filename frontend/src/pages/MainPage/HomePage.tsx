import { Link } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    BarChart3,
    CheckCircle2,
    ChevronRight,
    CircleAlert,
    Gauge,
    GitBranch,
    Layers3,
    ShieldCheck,
    Sparkles,
    Target,
} from "lucide-react";

function HomePage() {
    const workflowSteps = [
        {
            number: "01",
            title: "Software idea",
            description: "Define the software you want to build.",
        },
        {
            number: "02",
            title: "Requirements",
            description:
                "Translate the idea into concrete project requirements.",
        },
        {
            number: "03",
            title: "Development plan",
            description:
                "Organize milestones and development tasks around the project.",
        },
        {
            number: "04",
            title: "Development",
            description:
                "Track tasks, issues, API tests, and project progress.",
        },
        {
            number: "05",
            title: "Project intelligence",
            description:
                "Analyze health, technical practices, and ML-based project risk.",
        },
    ];

    const features = [
        {
            icon: Layers3,
            title: "Project planning",
            description:
                "Organize requirements, milestones, tasks, and development work around the actual structure of your software project.",
        },
        {
            icon: BarChart3,
            title: "Project analytics",
            description:
                "Track progress, task completion, requirements, milestones, issues, and development activity through measurable project metrics.",
        },
        {
            icon: Activity,
            title: "API testing",
            description:
                "Record API tests, monitor failures and response times, and use testing activity as part of the overall project picture.",
        },
        {
            icon: ShieldCheck,
            title: "Technical review",
            description:
                "Evaluate engineering practices such as validation, authentication, logging, security headers, and integration testing.",
        },
        {
            icon: Target,
            title: "ML risk prediction",
            description:
                "Use project metrics to estimate whether a project is currently at low, medium, or high risk.",
        },
        {
            icon: GitBranch,
            title: "Explainable insights",
            description:
                "Understand the project factors associated with the current risk prediction and identify areas that need attention.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* =========================================================
                NAVBAR
            ========================================================= */}

            <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="group flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-blue-700">
                            <Activity
                                size={20}
                                strokeWidth={2.2}
                                className="transition-transform duration-300 group-hover:rotate-6"
                            />
                        </div>

                        <div>
                            <span className="block text-lg font-semibold tracking-tight text-slate-900">
                                ProjectPulse
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <a
                            href="#features"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Features
                        </a>

                        <a
                            href="#workflow"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Workflow
                        </a>

                        <a
                            href="#intelligence"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            Intelligence
                        </a>
                    </nav>

                    {/* Auth */}
                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="hidden text-sm font-medium text-slate-600 transition hover:text-slate-900 sm:block"
                        >
                            Sign in
                        </Link>

                        <Link
                            to="/register"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                {/* =========================================================
                    HERO
                ========================================================= */}

                <section className="relative overflow-hidden bg-white">
                    {/* Animated Background */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-blue-100/50 blur-3xl animate-[floatSlow_10s_ease-in-out_infinite]" />

                        <div className="absolute right-[-12rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-indigo-100/40 blur-3xl animate-[floatReverse_12s_ease-in-out_infinite]" />

                        <div className="absolute left-[46%] top-24 h-20 w-20 rounded-3xl border border-blue-100 bg-white/60 rotate-12 animate-[softFloat_8s_ease-in-out_infinite]" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            {/* Hero Content */}
                            <div className="animate-[fadeIn_0.8s_ease-out]">
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                                    <Sparkles size={14} />

                                    Intelligent software project development
                                </div>

                                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                    Turn software ideas into
                                    <span className="block text-blue-600">
                                        measurable progress.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                                    ProjectPulse gives developers one place to
                                    plan projects, manage development work,
                                    test APIs, understand project health, and
                                    identify risks before they become bigger
                                    problems.
                                </p>

                                {/* CTA */}
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
                                    >
                                        Start building

                                        <ArrowRight
                                            size={17}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>

                                    <a
                                        href="#features"
                                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        Explore platform
                                    </a>
                                </div>

                                {/* Trust Points */}
                                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2
                                            size={15}
                                            className="text-emerald-500"
                                        />
                                        Project planning
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <CheckCircle2
                                            size={15}
                                            className="text-emerald-500"
                                        />
                                        Technical analytics
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <CheckCircle2
                                            size={15}
                                            className="text-emerald-500"
                                        />
                                        ML risk prediction
                                    </div>
                                </div>
                            </div>

                            {/* =================================================
                                DASHBOARD PREVIEW
                            ================================================= */}

                            <div className="relative animate-[slideUp_0.9s_cubic-bezier(0.22,1,0.36,1)]">
                                {/* Glow */}
                                <div className="absolute -inset-5 rounded-3xl bg-blue-100/60 blur-3xl" />

                                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/30 transition duration-500 hover:-translate-y-1 hover:shadow-blue-100/60">
                                    {/* Browser Header */}
                                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                                        </div>

                                        <div className="text-[11px] text-slate-400">
                                            projectpulse / project
                                        </div>

                                        <div className="w-10" />
                                    </div>

                                    {/* Dashboard */}
                                    <div className="p-5">
                                        <div className="mb-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-slate-400">
                                                    PROJECT
                                                </p>

                                                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                                                    FoodFlow
                                                </h3>
                                            </div>

                                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                                                On track
                                            </span>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-[11px] text-slate-400">
                                                    Progress
                                                </p>

                                                <p className="mt-2 text-xl font-semibold text-slate-900">
                                                    68%
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-[11px] text-slate-400">
                                                    Tasks
                                                </p>

                                                <p className="mt-2 text-xl font-semibold text-slate-900">
                                                    34
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-[11px] text-slate-400">
                                                    Issues
                                                </p>

                                                <p className="mt-2 text-xl font-semibold text-slate-900">
                                                    3
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <p className="text-[11px] text-slate-400">
                                                    API tests
                                                </p>

                                                <p className="mt-2 text-xl font-semibold text-slate-900">
                                                    91%
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-xs font-medium text-slate-500">
                                                    Development progress
                                                </span>

                                                <span className="text-xs text-slate-400">
                                                    68 / 100
                                                </span>
                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                                                <div className="h-full w-[68%] rounded-full bg-blue-600" />
                                            </div>
                                        </div>

                                        {/* Bottom Cards */}
                                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                                <div className="flex items-center gap-2">
                                                    <Gauge
                                                        size={15}
                                                        className="text-blue-600"
                                                    />

                                                    <span className="text-xs font-medium text-slate-700">
                                                        Project health
                                                    </span>
                                                </div>

                                                <p className="mt-3 text-sm text-slate-500">
                                                    Healthy development activity
                                                </p>
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                                <div className="flex items-center gap-2">
                                                    <CircleAlert
                                                        size={15}
                                                        className="text-amber-500"
                                                    />

                                                    <span className="text-xs font-medium text-slate-700">
                                                        Risk prediction
                                                    </span>
                                                </div>

                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-sm text-slate-500">
                                                        Medium
                                                    </span>

                                                    <span className="text-xs text-slate-400">
                                                        58%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    FEATURES
                ========================================================= */}

                <section
                    id="features"
                    className="border-y border-slate-200 bg-slate-50"
                >
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                                One development workspace
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                Everything you need to understand your project.
                            </h2>

                            <p className="mt-4 leading-7 text-slate-500">
                                ProjectPulse connects planning, development,
                                testing, analytics, technical review, and
                                project risk into a single development flow.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.title}
                                        className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-100">
                                            <Icon size={20} />
                                        </div>

                                        <h3 className="mt-5 font-semibold text-slate-900">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    WORKFLOW
                ========================================================= */}

                <section
                    id="workflow"
                    className="bg-white"
                >
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                            {/* Heading */}
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                                    Development workflow
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                    From idea to project intelligence.
                                </h2>

                                <p className="mt-5 leading-7 text-slate-500">
                                    Instead of treating project management as a
                                    collection of disconnected tasks,
                                    ProjectPulse follows the lifecycle of a
                                    software project.
                                </p>
                            </div>

                            {/* Steps */}
                            <div className="space-y-3">
                                {workflowSteps.map((step) => (
                                    <div
                                        key={step.number}
                                        className="group flex gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                    >
                                        <span className="text-sm font-semibold text-blue-600">
                                            {step.number}
                                        </span>

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-900">
                                                {step.title}
                                            </h3>

                                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                                {step.description}
                                            </p>
                                        </div>

                                        <ChevronRight
                                            size={18}
                                            className="mt-1 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    INTELLIGENCE
                ========================================================= */}

                <section
                    id="intelligence"
                    className="border-y border-slate-200 bg-slate-50"
                >
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            {/* Content */}
                            <div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Sparkles size={21} />
                                </div>

                                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                    Project intelligence,
                                    <span className="block text-slate-500">
                                        not just task management.
                                    </span>
                                </h2>

                                <p className="mt-5 max-w-xl leading-7 text-slate-500">
                                    ProjectPulse combines measurable project
                                    metrics with technical engineering checks
                                    and machine learning to provide a broader
                                    view of project health.
                                </p>

                                <Link
                                    to="/register"
                                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                                >
                                    Explore ProjectPulse

                                    <ArrowRight
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>

                            {/* Intelligence Cards */}
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <Gauge
                                        size={20}
                                        className="text-blue-600"
                                    />

                                    <h3 className="mt-5 font-semibold text-slate-900">
                                        Project health
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Understand whether development activity
                                        is currently healthy, needs attention,
                                        or is at risk.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <CircleAlert
                                        size={20}
                                        className="text-amber-500"
                                    />

                                    <h3 className="mt-5 font-semibold text-slate-900">
                                        Risk factors
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        See the project metrics contributing to
                                        the current risk assessment.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <BarChart3
                                        size={20}
                                        className="text-blue-600"
                                    />

                                    <h3 className="mt-5 font-semibold text-slate-900">
                                        Measurable metrics
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Use development data instead of relying
                                        only on subjective project status.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <ShieldCheck
                                        size={20}
                                        className="text-emerald-600"
                                    />

                                    <h3 className="mt-5 font-semibold text-slate-900">
                                        Engineering review
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Review important backend and software
                                        engineering practices alongside project
                                        progress.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    CTA
                ========================================================= */}

                <section className="bg-white px-6 py-20 lg:px-8">
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 px-6 py-14 text-center shadow-xl shadow-slate-200/50 sm:px-12">
                        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

                        <div className="relative">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                                Start your next project
                            </p>

                            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                Build with clarity from the first requirement
                                to the final review.
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
                                Create a project and bring your development
                                workflow, metrics, testing, and project
                                intelligence into one place.
                            </p>

                            <Link
                                to="/register"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
                            >
                                Create your account

                                <ArrowRight size={17} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* =========================================================
                FOOTER
            ========================================================= */}

            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <Activity size={17} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                ProjectPulse
                            </p>

                            <p className="text-xs text-slate-400">
                                Intelligent software project development
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 text-sm text-slate-500">
                        <Link
                            to="/login"
                            className="transition hover:text-slate-900"
                        >
                            Sign in
                        </Link>

                        <Link
                            to="/register"
                            className="transition hover:text-slate-900"
                        >
                            Register
                        </Link>

                        <span>
                            © {new Date().getFullYear()} ProjectPulse
                        </span>
                    </div>
                </div>
            </footer>

            {/* =========================================================
                ANIMATIONS
            ========================================================= */}

            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(8px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(24px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes floatSlow {
                        0%,
                        100% {
                            transform: translate3d(0, 0, 0);
                        }

                        50% {
                            transform: translate3d(24px, 18px, 0);
                        }
                    }

                    @keyframes floatReverse {
                        0%,
                        100% {
                            transform: translate3d(0, 0, 0);
                        }

                        50% {
                            transform: translate3d(-22px, -18px, 0);
                        }
                    }

                    @keyframes softFloat {
                        0%,
                        100% {
                            transform: translateY(0) rotate(12deg);
                        }

                        50% {
                            transform: translateY(-14px) rotate(16deg);
                        }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        *,
                        *::before,
                        *::after {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default HomePage;