import { 
    CircleAlert, 
    ListChecks, 
    Plus, 
    Trash2, 
} from "lucide-react"; 

import type { 
    Issue, 
    IssuePriority, 
    IssueStatus, 
} from "../../../types/issue"; 

interface IssuesViewProps {
    issues: Issue[];

    title: string;
    description: string;
    priority: IssuePriority;

    loading: boolean;
    saving: boolean;
    error: string;

    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onPriorityChange: (value: IssuePriority) => void;

    onCreate: () => void;
    onStatusChange: (issue: Issue, status: IssueStatus) => void;
    onPriorityUpdate: (
        issue: Issue,
        priority: IssuePriority
    ) => void;
    onDelete: (id: number) => void;
}

function IssuesView({ 
    issues, 
    title, 
    description, 
    priority, 
    loading, 
    saving, 
    error, 
    onTitleChange, 
    onDescriptionChange, 
    onPriorityChange, 
    onCreate, 
    onStatusChange, 
    onPriorityUpdate, 
    onDelete, 
}: IssuesViewProps) { 
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
                        <span>Issues</span> 
                    </div> 

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"> 
                        <div className="flex items-start gap-3"> 
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"> 
                                <CircleAlert size={21} /> 
                            </div> 

                            <div> 
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900"> 
                                    Issue Tracking 
                                </h1> 

                                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500"> 
                                    Track development issues, manage their 
                                    priority, and monitor their resolution 
                                    throughout the project. 
                                </p> 
                            </div> 
                        </div> 

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"> 
                            <p className="text-xs font-medium uppercase tracking-wide text-slate-400"> 
                                Issue History 
                            </p> 

                            <p className="mt-1 text-sm font-semibold text-slate-900"> 
                                {issues.length}{" "} 
                                {issues.length === 1 ? "Issue" : "Issues"} 
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
                    {/* Create Issue */} 
                    <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"> 
                        <div className="mb-6"> 
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"> 
                                <Plus size={20} /> 
                            </div> 

                            <h2 className="text-lg font-semibold text-slate-900"> 
                                Report Issue 
                            </h2> 

                            <p className="mt-1 text-sm leading-6 text-slate-500"> 
                                Record a development issue and assign an 
                                appropriate priority. 
                            </p> 
                        </div> 

                        <form 
                            onSubmit={(event) => { 
                                event.preventDefault(); 
                                onCreate(); 
                            }} 
                            className="space-y-5" 
                        > 
                            <div> 
                                <label className="mb-2 block text-sm font-medium text-slate-700"> 
                                    Title 
                                </label> 

                                <input 
                                    type="text" 
                                    value={title} 
                                    onChange={(event) => 
                                        onTitleChange(event.target.value) 
                                    } 
                                    placeholder="Login API returns 500 error" 
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                                /> 
                            </div> 

                            <div> 
                                <label className="mb-2 block text-sm font-medium text-slate-700"> 
                                    Description 
                                </label> 

                                <textarea 
                                    value={description} 
                                    onChange={(event) => 
                                        onDescriptionChange(event.target.value) 
                                    } 
                                    placeholder="Describe the issue and its impact..." 
                                    rows={4} 
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                                /> 
                            </div> 

                            <div> 
                                <label className="mb-2 block text-sm font-medium text-slate-700"> 
                                    Priority 
                                </label> 

                                <select 
                                    value={priority} 
                                    onChange={(event) => 
                                        onPriorityChange( 
                                            event.target.value as IssuePriority 
                                        ) 
                                    } 
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                                > 
                                    <option value="LOW">LOW</option> 
                                    <option value="MEDIUM">MEDIUM</option> 
                                    <option value="HIGH">HIGH</option> 
                                    <option value="CRITICAL">CRITICAL</option> 
                                </select> 
                            </div> 

                            <button 
                                type="submit" 
                                disabled={saving} 
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50" 
                            > 
                                <Plus size={17} /> 

                                {saving ? "Saving..." : "Report Issue"} 
                            </button> 
                        </form> 
                    </section> 

                    {/* Issue List */} 
                    <section className="lg:col-span-3"> 
                        <div className="mb-5"> 
                            <p className="text-sm font-medium text-blue-600"> 
                                Development Tracking 
                            </p> 

                            <h2 className="mt-1 text-2xl font-semibold text-slate-900"> 
                                Project Issues 
                            </h2> 

                            <p className="mt-1 text-sm text-slate-500"> 
                                Review active issues and update their status 
                                and priority as development progresses. 
                            </p> 
                        </div> 

                        {issues.length === 0 ? ( 
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"> 
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500"> 
                                    <ListChecks size={24} /> 
                                </div> 

                                <h3 className="mb-2 text-base font-medium text-slate-900"> 
                                    No issues reported 
                                </h3> 

                                <p className="text-sm text-slate-500"> 
                                    Report your first development issue to 
                                    begin tracking problems in the project. 
                                </p> 
                            </div> 
                        ) : ( 
                            <div className="space-y-4"> 
                                {issues.map((issue) => ( 
                                    <article 
                                        key={issue.id} 
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300" 
                                    > 
                                        <div className="flex items-start justify-between gap-4"> 
                                            <div className="min-w-0 flex-1"> 
                                                <div className="flex items-start gap-3"> 
                                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600"> 
                                                        <CircleAlert size={17} /> 
                                                    </div> 

                                                    <div className="min-w-0"> 
                                                        <h3 className="font-semibold text-slate-900"> 
                                                            {issue.title} 
                                                        </h3> 

                                                        <p className="mt-2 text-sm leading-6 text-slate-500"> 
                                                            {issue.description || 
                                                                "No description provided."} 
                                                        </p> 
                                                    </div> 
                                                </div> 
                                            </div> 

                                            <button 
                                                type="button" 
                                                onClick={() => 
                                                    onDelete(issue.id) 
                                                } 
                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600" 
                                                title="Delete issue" 
                                            > 
                                                <Trash2 size={17} /> 
                                            </button> 
                                        </div> 

                                        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2"> 
                                            <div> 
                                                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400"> 
                                                    Status 
                                                </label> 

                                                <select 
                                                    value={issue.status} 
                                                    onChange={(event) => 
                                                        onStatusChange( 
                                                            issue, 
                                                            event.target 
                                                                .value as IssueStatus 
                                                        ) 
                                                    } 
                                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                                                > 
                                                    <option value="OPEN">OPEN</option> 
                                                    <option value="IN_PROGRESS">IN PROGRESS</option> 
                                                    <option value="RESOLVED">RESOLVED</option> 
                                                    <option value="CLOSED">CLOSED</option> 
                                                </select> 
                                            </div> 

                                            <div> 
                                                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400"> 
                                                    Priority 
                                                </label> 

                                                <select 
                                                    value={issue.priority} 
                                                    onChange={(event) => 
                                                        onPriorityUpdate( 
                                                            issue, 
                                                            event.target 
                                                                .value as IssuePriority 
                                                        ) 
                                                    } 
                                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
                                                > 
                                                    <option value="LOW">LOW</option> 
                                                    <option value="MEDIUM">MEDIUM</option> 
                                                    <option value="HIGH">HIGH</option> 
                                                    <option value="CRITICAL">CRITICAL</option> 
                                                </select> 
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

export default IssuesView;