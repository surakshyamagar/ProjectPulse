import {
    Activity,
    BarChart3,
    ClipboardCheck,
    FileText,
    GitPullRequest,
    LayoutDashboard,
    ListChecks,
    Milestone,
    ShieldCheck,
    Target,
    TestTube2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface ProjectSidebarProps {
    projectId: number;
}

function ProjectSidebar({ projectId }: ProjectSidebarProps) {
    const location = useLocation();

    const projectBasePath = `/projects/${projectId}`;

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const isSectionActive = (path: string) => {
        return location.pathname.startsWith(path);
    };

    const navigationItemClasses = (active: boolean) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            active
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`;

    return (
        <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
            {/* Brand */}
            <div className="border-b border-slate-100 px-5 py-5">
                <Link
                    to="/dashboard"
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-all duration-200 group-hover:bg-blue-700 group-hover:shadow-md">
                        <Activity size={21} strokeWidth={2.4} />
                    </div>

                    <div>
                        <p className="text-[15px] font-bold tracking-tight text-slate-900">
                            ProjectPulse
                        </p>

                        <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                            Software Project Platform
                        </p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-6">
                {/* Workspace */}
                <div className="mb-7">
                    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Workspace
                    </p>

                    <div className="space-y-1">
                        <Link
                            to={projectBasePath}
                            className={navigationItemClasses(
                                isActive(projectBasePath)
                            )}
                        >
                            <LayoutDashboard
                                size={18}
                                strokeWidth={2}
                                className={
                                    isActive(projectBasePath)
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Overview</span>
                        </Link>
                    </div>
                </div>

                {/* Development */}
                <div className="mb-7">
                    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Development
                    </p>

                    <div className="space-y-1">
                        <Link
                            to={`${projectBasePath}/requirements`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/requirements`
                                )
                            )}
                        >
                            <FileText
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/requirements`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Requirements</span>
                        </Link>

                        <Link
                            to={`${projectBasePath}/milestones`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/milestones`
                                )
                            )}
                        >
                            <Milestone
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/milestones`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Milestones</span>
                        </Link>

                        <div className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400">
                            <ListChecks
                                size={18}
                                strokeWidth={2}
                            />

                            <span>Tasks</span>

                            <span className="ml-auto rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                Milestone
                            </span>
                        </div>

                        <Link
                            to={`${projectBasePath}/issues`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/issues`
                                )
                            )}
                        >
                            <GitPullRequest
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/issues`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Issues</span>
                        </Link>

                        <Link
                            to={`${projectBasePath}/api-tests`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/api-tests`
                                )
                            )}
                        >
                            <TestTube2
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/api-tests`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>API Tests</span>
                        </Link>
                    </div>
                </div>

                {/* Insights */}
                <div>
                    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Insights
                    </p>

                    <div className="space-y-1">
                        <Link
                            to={`${projectBasePath}/analytics`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/analytics`
                                )
                            )}
                        >
                            <BarChart3
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/analytics`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Analytics</span>
                        </Link>

                        <Link
                            to={`${projectBasePath}/review`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/review`
                                )
                            )}
                        >
                            <ClipboardCheck
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/review`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Technical Review</span>
                        </Link>

                        <Link
                            to={`${projectBasePath}/risk`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/risk`
                                )
                            )}
                        >
                            <ShieldCheck
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/risk`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Risk Analysis</span>
                        </Link>

                        <Link
                            to={`${projectBasePath}/recommendations`}
                            className={navigationItemClasses(
                                isSectionActive(
                                    `${projectBasePath}/recommendations`
                                )
                            )}
                        >
                            <Target
                                size={18}
                                strokeWidth={2}
                                className={
                                    isSectionActive(
                                        `${projectBasePath}/recommendations`
                                    )
                                        ? "text-blue-600"
                                        : "text-slate-400 transition-colors group-hover:text-slate-600"
                                }
                            />

                            <span>Recommendations</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Bottom project context */}
            <div className="border-t border-slate-100 p-4">
                <Link
                    to="/projects"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 transition hover:border-slate-300 hover:bg-white"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Activity size={16} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-700">
                            Project workspace
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                            Back to all projects
                        </p>
                    </div>
                </Link>
            </div>
        </aside>
    );
}

export default ProjectSidebar;