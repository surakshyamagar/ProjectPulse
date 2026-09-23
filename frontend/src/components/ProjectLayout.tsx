import { Outlet, useParams } from "react-router-dom";
import ProjectSidebar from "./ProjectSidebar";

function ProjectLayout() {
    const { projectId, id } = useParams();

    const currentProjectId = Number(projectId || id);

    if (!currentProjectId) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="rounded-2xl border border-slate-200 bg-white px-8 py-7 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <span className="text-lg font-semibold">!</span>
                    </div>

                    <h1 className="text-sm font-semibold text-slate-900">
                        Project not found
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        The requested project could not be found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                <ProjectSidebar projectId={currentProjectId} />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ProjectLayout;