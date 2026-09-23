import { Link } from "react-router-dom";
import type { FormEvent } from "react";
import {
    Activity,
    ArrowLeft,
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
} from "lucide-react";
import { useState } from "react";

interface RegisterFormProps {
    name: string;
    email: string;
    password: string;
    error: string;
    loading: boolean;

    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function RegisterView({
    name,
    email,
    password,
    error,
    loading,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onSubmit,
}: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            {/* =====================================================
                Animated Background
            ====================================================== */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                {/* Top-left glow */}
                <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-blue-100/50 blur-3xl animate-[floatSlow_9s_ease-in-out_infinite]" />

                {/* Bottom-right glow */}
                <div className="absolute -bottom-48 -right-48 h-[34rem] w-[34rem] rounded-full bg-indigo-100/40 blur-3xl animate-[floatReverse_11s_ease-in-out_infinite]" />

                {/* Floating square */}
                <div className="absolute left-[43%] top-[16%] h-24 w-24 rounded-3xl border border-blue-100/80 bg-white/30 rotate-12 animate-[softFloat_8s_ease-in-out_infinite]" />

                {/* Small floating shape */}
                <div className="absolute bottom-[14%] left-[10%] h-16 w-16 rounded-2xl border border-slate-200/80 bg-white/30 -rotate-12 animate-[softFloatReverse_7s_ease-in-out_infinite]" />

                {/* Small decorative dot */}
                <div className="absolute right-[18%] top-[28%] h-2 w-2 rounded-full bg-blue-200 animate-[pulseSoft_3s_ease-in-out_infinite]" />
            </div>

            {/* =====================================================
                Main Layout
            ====================================================== */}

            <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
                {/* =================================================
                    LEFT BRANDING
                ================================================== */}

                <section className="relative hidden overflow-hidden border-r border-slate-200 bg-white lg:flex lg:flex-col lg:justify-between">
                    {/* Decorative Background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.09),_transparent_40%)]" />

                        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-100 to-transparent" />

                        {/* Large animated ring */}
                        <div className="absolute -left-28 top-[32%] h-72 w-72 rounded-full border border-blue-100/80 animate-[ringFloat_10s_ease-in-out_infinite]" />

                        {/* Smaller animated ring */}
                        <div className="absolute -left-10 top-[39%] h-44 w-44 rounded-full border border-slate-100 animate-[ringFloatReverse_8s_ease-in-out_infinite]" />
                    </div>

                    {/* =================================================
                        Logo
                    ================================================== */}

                    <div className="relative z-10 p-10 xl:p-12">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:bg-blue-700">
                                <Activity
                                    size={23}
                                    strokeWidth={2.2}
                                    className="transition-transform duration-500 group-hover:rotate-6"
                                />
                            </div>

                            <div>
                                <span className="block text-xl font-semibold tracking-tight text-slate-900">
                                    ProjectPulse
                                </span>

                                <span className="text-xs text-slate-400">
                                    Software Project Development Platform
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* =================================================
                        Main Brand Content
                    ================================================== */}

                    <div className="relative z-10 px-10 pb-16 xl:px-16">
                        <div className="max-w-xl">
                            {/* Label */}
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-[pulseSoft_2s_ease-in-out_infinite]" />

                                Software Project Development
                            </div>

                            {/* Heading */}
                            <h1 className="animate-[fadeIn_0.8s_ease-out] text-4xl font-semibold leading-tight tracking-tight text-slate-900 xl:text-5xl">
                                Start building with a clearer development
                                workflow.
                            </h1>

                            {/* Description */}
                            <p className="mt-6 max-w-lg animate-[fadeIn_1s_ease-out] text-base leading-7 text-slate-500">
                                ProjectPulse brings requirements, milestones,
                                tasks, API testing, analytics, technical
                                review, and intelligent project risk
                                prediction into one workspace.
                            </p>

                            {/* =================================================
                                Benefits
                            ================================================== */}

                            <div className="mt-8 space-y-4">
                                {/* Benefit 1 */}
                                <div className="group flex items-start gap-3 rounded-xl p-2 -ml-2 transition-all duration-300 hover:bg-slate-50">
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                                        <span className="text-xs font-semibold">
                                            ✓
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Organize development work
                                        </p>

                                        <p className="mt-1 text-sm leading-5 text-slate-500">
                                            Keep requirements, milestones, and
                                            tasks connected.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 2 */}
                                <div className="group flex items-start gap-3 rounded-xl p-2 -ml-2 transition-all duration-300 hover:bg-slate-50">
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                                        <span className="text-xs font-semibold">
                                            ✓
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Understand project health
                                        </p>

                                        <p className="mt-1 text-sm leading-5 text-slate-500">
                                            Turn development activity into
                                            useful project metrics.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefit 3 */}
                                <div className="group flex items-start gap-3 rounded-xl p-2 -ml-2 transition-all duration-300 hover:bg-slate-50">
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-105">
                                        <span className="text-xs font-semibold">
                                            ✓
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Identify project risks
                                        </p>

                                        <p className="mt-1 text-sm leading-5 text-slate-500">
                                            Use project metrics and ML-based
                                            risk prediction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="relative z-10 px-10 pb-8 text-sm text-slate-400 xl:px-12">
                        Intelligent development starts with better visibility.
                    </div>
                </section>

                {/* =================================================
                    RIGHT REGISTER SECTION
                ================================================== */}

                <section className="flex min-h-screen items-center justify-center px-6 py-8 sm:px-10 lg:px-16">
                    <div className="w-full max-w-md">
                        {/* =================================================
                            Back To Home — TOP
                        ================================================== */}

                        <div className="mb-8">
                            <Link
                                to="/"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-all duration-200 hover:text-slate-700"
                            >
                                <ArrowLeft
                                    size={16}
                                    className="transition-transform duration-200 group-hover:-translate-x-1"
                                />

                                Back to home
                            </Link>
                        </div>

                        {/* =================================================
                            Mobile Logo
                        ================================================== */}

                        <div className="mb-9 lg:hidden">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-3"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                                    <Activity
                                        size={21}
                                        strokeWidth={2.2}
                                    />
                                </div>

                                <span className="text-xl font-semibold tracking-tight text-slate-900">
                                    ProjectPulse
                                </span>
                            </Link>
                        </div>

                        {/* =================================================
                            Heading
                        ================================================== */}

                        <div className="mb-8 animate-[fadeIn_0.7s_ease-out]">
                            {/* Icon + Account Access */}
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Activity size={21} />
                                </div>

                                <p className="text-sm font-medium text-blue-600">
                                    Account Setup
                                </p>
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Start organizing and understanding your
                                software projects with ProjectPulse.
                            </p>
                        </div>

                        {/* =================================================
                            Register Card
                        ================================================== */}

                        <div className="animate-[slideUp_0.7s_cubic-bezier(0.22,1,0.36,1)] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Create your ProjectPulse account
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    Enter your details to get started.
                                </p>
                            </div>

                            {/* =================================================
                                Form
                            ================================================== */}

                            <form
                                onSubmit={onSubmit}
                                className="space-y-5"
                            >
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Full name
                                    </label>

                                    <div className="relative">
                                        <User
                                            size={18}
                                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(event) =>
                                                onNameChange(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Your name"
                                            required
                                            autoComplete="name"
                                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={18}
                                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(event) =>
                                                onEmailChange(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="you@example.com"
                                            required
                                            autoComplete="email"
                                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">
                                        <Lock
                                            size={18}
                                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(event) =>
                                                onPasswordChange(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Create a password"
                                            required
                                            autoComplete="new-password"
                                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                        />

                                        {/* Show / Hide Password */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (current) => !current
                                                )
                                            }
                                            className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                            title={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 animate-[fadeIn_0.3s_ease-out]">
                                        {error}
                                    </div>
                                )}

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                            Creating account...
                                        </>
                                    ) : (
                                        "Create account"
                                    )}
                                </button>
                            </form>

                            {/* =================================================
                                Login
                            ================================================== */}

                            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
                                <p className="text-sm text-slate-500">
                                    Already have an account?{" "}

                                    <Link
                                        to="/login"
                                        className="font-medium text-blue-600 transition hover:text-blue-700"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* =====================================================
                Animation Keyframes
            ====================================================== */}

            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(6px);
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
                            transform: translate3d(25px, 18px, 0);
                        }
                    }

                    @keyframes floatReverse {
                        0%,
                        100% {
                            transform: translate3d(0, 0, 0);
                        }

                        50% {
                            transform: translate3d(-22px, -16px, 0);
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

                    @keyframes softFloatReverse {
                        0%,
                        100% {
                            transform: translateY(0) rotate(-12deg);
                        }

                        50% {
                            transform: translateY(-12px) rotate(-8deg);
                        }
                    }

                    @keyframes ringFloat {
                        0%,
                        100% {
                            transform: translateY(0) scale(1);
                        }

                        50% {
                            transform: translateY(-12px) scale(1.02);
                        }
                    }

                    @keyframes ringFloatReverse {
                        0%,
                        100% {
                            transform: translateY(0) scale(1);
                        }

                        50% {
                            transform: translateY(12px) scale(0.98);
                        }
                    }

                    @keyframes pulseSoft {
                        0%,
                        100% {
                            opacity: 0.45;
                            transform: scale(0.95);
                        }

                        50% {
                            opacity: 1;
                            transform: scale(1);
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

export default RegisterView;