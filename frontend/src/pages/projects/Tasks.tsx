import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type {Task, TaskPriority, TaskStatus} from "../../types/task";
import TasksView from "../Views/projectViews/TasksView";
import { createTask, deleteTask, getTasks, updateTask } from "../../services/projects/taskService";

function Tasks() {
    const { milestoneId } = useParams();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] =
        useState<TaskPriority>("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    /*
     * Load tasks
     */
    useEffect(() => {
        const loadTasks = async () => {
            try {
                setLoading(true);
                setError("");

                const id = Number(milestoneId);

                if (!Number.isInteger(id) || id <= 0) {
                    setError("Invalid milestone ID");
                    return;
                }

                const data = await getTasks(id);

                setTasks(data);
            } catch (error: unknown) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    setError(
                        error.response?.data?.message ||
                            "Failed to load tasks"
                    );
                } else {
                    setError("Failed to load tasks");
                }
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [milestoneId]);

    /*
     * Create task
     */
    const handleCreate = async () => {
        try {
            setSaving(true);
            setError("");

            const id = Number(milestoneId);

            if (!Number.isInteger(id) || id <= 0) {
                setError("Invalid milestone ID");
                return;
            }

            const newTask = await createTask(id, {
                title,
                description,
                status: "TODO",
                priority,
                dueDate: dueDate
                    ? new Date(dueDate).toISOString()
                    : undefined,
            });

            setTasks((current) => [
                newTask,
                ...current,
            ]);

            setTitle("");
            setDescription("");
            setPriority("MEDIUM");
            setDueDate("");

            alert("Task created successfully!");
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ||
                        "Failed to create task"
                );
            } else {
                setError("Failed to create task");
            }
        } finally {
            setSaving(false);
        }
    };

    /*
     * Update task status
     */
    const handleStatusChange = async (
        task: Task,
        status: TaskStatus
    ) => {
        try {
            const updatedTask = await updateTask(
                task.id,
                {
                    status,
                }
            );

            setTasks((current) =>
                current.map((item) =>
                    item.id === updatedTask.id
                        ? updatedTask
                        : item
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to update task"
                );
            } else {
                alert("Failed to update task");
            }
        }
    };

    /*
     * Update task priority
     */
    const handlePriorityChange = async (
        task: Task,
        priority: TaskPriority
    ) => {
        try {
            const updatedTask = await updateTask(
                task.id,
                {
                    priority,
                }
            );

            setTasks((current) =>
                current.map((item) =>
                    item.id === updatedTask.id
                        ? updatedTask
                        : item
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to update task"
                );
            } else {
                alert("Failed to update task");
            }
        }
    };

    /*
     * Delete task
     */
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteTask(id);

            setTasks((current) =>
                current.filter(
                    (task) => task.id !== id
                )
            );
        } catch (error: unknown) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ||
                        "Failed to delete task"
                );
            } else {
                alert("Failed to delete task");
            }
        }
    };

    return (
        <TasksView
            tasks={tasks}
            title={title}
            description={description}
            priority={priority}
            dueDate={dueDate}
            loading={loading}
            saving={saving}
            error={error}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onPriorityChange={setPriority}
            onDueDateChange={setDueDate}
            onCreate={handleCreate}
            onStatusChange={handleStatusChange}
            onTaskPriorityChange={handlePriorityChange}
            onDelete={handleDelete}
        />
    );
}

export default Tasks;