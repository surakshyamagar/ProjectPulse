import { Request, Response } from "express";
import prisma from "../../config/db";

import {
    createTaskSchema,
    updateTaskSchema,
} from "../../validators/taskValidator";

// ==========================================
// CREATE TASK
// POST /api/milestones/:milestoneId/tasks
// ==========================================

const createTask = async (
    req: Request,
    res: Response
) => {
    try {
        // checks it against your Zod schema.
        const result = createTaskSchema.safeParse(
            req.body
        );

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Get the logged-in user's ID
        // If req.user exists, get userId; otherwise don't crash.
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Get milestoneId from the URL 5 2
        const milestoneId = Number(
            req.params.milestoneId
        );

        // chnage string to number
        if (Number.isNaN(milestoneId)) {
            return res.status(400).json({
                message: "Invalid milestone ID",
            });
        }

        // Check that the milestone belongs
        // to a project owned by the logged-in user.
        const milestone =
            await prisma.milestone.findFirst({
                where: {
                    id: milestoneId,
                    project: {
                        userId,
                    },
                },
            });

        if (!milestone) {
            return res.status(404).json({
                message: "Milestone not found",
            });
        }

        const {
            title,
            description,
            status,
            priority,
            dueDate,
        } = result.data;

        const task = await prisma.task.create({
            data: {
                milestoneId,
                title,
                description,
                status,
                priority,
                dueDate: dueDate
                    ? new Date(dueDate)
                    : undefined,
            },
        });

        return res.status(201).json({
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        console.error("Create task error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// ==========================================
// GET TASKS
// GET /api/milestones/:milestoneId/tasks
// ==========================================

const getTasks = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const milestoneId = Number(
            req.params.milestoneId
        );

        if (Number.isNaN(milestoneId)) {
            return res.status(400).json({
                message: "Invalid milestone ID",
            });
        }

        // Ownership check
        const milestone =
            await prisma.milestone.findFirst({
                where: {
                    id: milestoneId,
                    project: {
                        userId,
                    },
                },
            });

        if (!milestone) {
            return res.status(404).json({
                message: "Milestone not found",
            });
        }

        const tasks = await prisma.task.findMany({
            where: {
                milestoneId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    } catch (error) {
        console.error("Get tasks error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// ==========================================
// UPDATE TASK
// PATCH /api/tasks/:id
// ==========================================

const updateTask = async (
    req: Request,
    res: Response
) => {
    try {
        const result = updateTaskSchema.safeParse(
            req.body
        );

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        // Check task ownership through milestone -> project
        const existingTask =
            await prisma.task.findFirst({
                where: {
                    id: taskId,
                    milestone: {
                        project: {
                            userId,
                        },
                    },
                },
            });

        if (!existingTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const {
            title,
            description,
            status,
            priority,
            dueDate,
        } = result.data;

        const task = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
               title, 
               description, 
               status, 
               priority, 
               dueDate: dueDate ? new Date(dueDate) : undefined,
            },
        });

        return res.status(200).json({
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        console.error("Update task error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// ==========================================
// DELETE TASK
// DELETE /api/tasks/:id
// ==========================================

const deleteTask = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                message: "Invalid task ID",
            });
        }

        // Check ownership
        const existingTask =
            await prisma.task.findFirst({
                where: {
                    id: taskId,
                    milestone: {
                        project: {
                            userId,
                        },
                    },
                },
            });

        if (!existingTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        return res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Delete task error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};