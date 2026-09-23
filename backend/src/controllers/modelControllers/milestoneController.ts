import { Request, Response } from "express";
import prisma from "../../config/db";
import { createMilestoneSchema, updateMilestoneSchema } from "../../validators/milestoneValidator";

// ==========================================
// CREATE MILESTONE
// POST /api/projects/:projectId/milestones
// ==========================================

export const createMilestone = async (
    req: Request,
    res: Response
) => {
    try {
        // Get logged-in user
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Get project ID from URL
        const projectId = Number(req.params.projectId);

        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Validate request body
        const validation = createMilestoneSchema.safeParse(
            req.body
        );

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0].message,
            });
        }

        // Check project ownership
        // The project must belong to the logged-in user
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId,
            },
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const milestone = await prisma.milestone.create({
            data: {
                projectId,
                name: validation.data.name,
                description: validation.data.description,
            },
        });

        // A newly created milestone has no completed tasks,
        // so its derived completion status is false.
        // This value is not stored in the database.
        return res.status(201).json({
            message: "Milestone created successfully",
            data: {
                ...milestone,
                completed: false,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create milestone",
        });
    }
};

// ==========================================
// GET ALL MILESTONES
// GET /api/projects/:projectId/milestones
// ==========================================

export const getMilestones = async (
    req: Request,
    res: Response
) => {
    try {
        // Get logged-in user
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Get project ID from URL
        const projectId = Number(req.params.projectId);

        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Check project ownership
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId,
            },
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        // Get milestones together with their task statuses.
        // Task status is used to calculate milestone completion.
        const milestones = await prisma.milestone.findMany({
            where: {
                projectId,
            },
            include: {
                tasks: {
                    select: {
                        status: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Calculate milestone completion for the UI.
        //
        // A milestone is considered completed only when:
        // 1. It has at least one task
        // 2. Every task is COMPLETED
        //
        // This is derived from task statuses and is NOT
        // stored as a milestone status in the database.
        const milestonesWithCompletion = milestones.map(
            (milestone) => {
                const completed =
                    milestone.tasks.length > 0 &&
                    milestone.tasks.every(
                        (task) =>
                            task.status === "COMPLETED"
                    );

                return {
                    id: milestone.id,
                    projectId: milestone.projectId,
                    name: milestone.name,
                    description: milestone.description,
                    createdAt: milestone.createdAt,
                    updatedAt: milestone.updatedAt,
                    completed,
                };
            }
        );

        return res.status(200).json({
            message: "Milestones fetched successfully",
            data: milestonesWithCompletion,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch milestones",
        });
    }
};

// ==========================================
// UPDATE MILESTONE
// PATCH /api/milestones/:id
// ==========================================

export const updateMilestone = async (
    req: Request,
    res: Response
) => {
    try {
        // Get logged-in user
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Get milestone ID from URL
        const milestoneId = Number(req.params.id);

        if (Number.isNaN(milestoneId)) {
            return res.status(400).json({
                message: "Invalid milestone ID",
            });
        }

        // Validate request body
        const validation = updateMilestoneSchema.safeParse(
            req.body
        );

        if (!validation.success) {
            return res.status(400).json({
                message: validation.error.issues[0].message,
            });
        }

        // Check milestone + project ownership
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

        // Update only the fields provided by the user
        const updatedMilestone =
            await prisma.milestone.update({
                where: {
                    id: milestoneId,
                },
                data: {
                    ...(validation.data.name !== undefined && {
                        name: validation.data.name,
                    }),
                    ...(validation.data.description !==
                        undefined && {
                        description:
                            validation.data.description,
                    }),
                },
            });

        // Get task statuses again so the updated milestone
        // response contains its current derived completion state.
        const tasks = await prisma.task.findMany({
            where: {
                milestoneId,
            },
            select: {
                status: true,
            },
        });

        // Milestone is completed only when it has at least
        // one task and all of its tasks are COMPLETED.
        // This value is derived and not saved in Prisma.
        const completed =
            tasks.length > 0 &&
            tasks.every(
                (task) => task.status === "COMPLETED"
            );

        return res.status(200).json({
            message: "Milestone updated successfully",
            data: {
                ...updatedMilestone,
                completed,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to update milestone",
        });
    }
};

// ==========================================
// DELETE MILESTONE
// DELETE /api/milestones/:id
// ==========================================

export const deleteMilestone = async (
    req: Request,
    res: Response
) => {
    try {
        // Get logged-in user
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Get milestone ID from URL
        const milestoneId = Number(req.params.id);

        if (Number.isNaN(milestoneId)) {
            return res.status(400).json({
                message: "Invalid milestone ID",
            });
        }

        // Check milestone + project ownership
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

        await prisma.milestone.delete({
            where: {
                id: milestoneId,
            },
        });

        return res.status(200).json({
            message: "Milestone deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete milestone",
        });
    }
};