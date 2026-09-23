import { Request, Response } from "express";
import prisma from "../../config/db";
import {createIssueSchema, updateIssueSchema,} from "../../validators/issueValidator";

// ==========================================
// CREATE ISSUE
// POST /api/projects/:projectId/issues
// ==========================================

const createIssue = async (
    req: Request,
    res: Response
) => {
    try {
        const result = createIssueSchema.safeParse(
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

        const projectId = Number(req.params.projectId);

        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

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

        const {
            title,
            description,
            status,
            priority,
        } = result.data;

        const issue = await prisma.issue.create({
            data: {
                projectId,
                title,
                description,
                status,
                priority,
            },
        });

        return res.status(201).json({
            message: "Issue created successfully",
            data: issue,
        });
    } catch (error) {
        console.error("Create issue error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// ==========================================
// GET ALL ISSUES
// GET /api/projects/:projectId/issues
// ==========================================

const getIssues = async (
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

        const projectId = Number(req.params.projectId);

        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

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

        const issues = await prisma.issue.findMany({
            where: {
                projectId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            message: "Issues retrieved successfully",
            data: issues,
        });
    } catch (error) {
        console.error("Get issues error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// ==========================================
// UPDATE ISSUE
// PATCH /api/issues/:id
// ==========================================

const updateIssue = async (
    req: Request,
    res: Response
) => {
    try {
        const result = updateIssueSchema.safeParse(
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

        const issueId = Number(req.params.id);

        if (Number.isNaN(issueId)) {
            return res.status(400).json({
                message: "Invalid issue ID",
            });
        }

        const existingIssue = await prisma.issue.findFirst({
            where: {
                id: issueId,
                project: {
                    userId,
                },
            },
        });

        if (!existingIssue) {
            return res.status(404).json({
                message: "Issue not found",
            });
        }

        const {
            title,
            description,
            status,
            priority,
        } = result.data;

        const issue = await prisma.issue.update({
            where: {
                id: issueId,
            },
            data: {
                title,
                description,
                status,
                priority,
            },
        });

        return res.status(200).json({
            message: "Issue updated successfully",
            data: issue,
        });
    } catch (error) {
        console.error("Update issue error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// ==========================================
// DELETE ISSUE
// DELETE /api/issues/:id
// ==========================================

const deleteIssue = async (
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

        const issueId = Number(req.params.id);

        if (Number.isNaN(issueId)) {
            return res.status(400).json({
                message: "Invalid issue ID",
            });
        }

        const existingIssue = await prisma.issue.findFirst({
            where: {
                id: issueId,
                project: {
                    userId,
                },
            },
        });

        if (!existingIssue) {
            return res.status(404).json({
                message: "Issue not found",
            });
        }

        await prisma.issue.delete({
            where: {
                id: issueId,
            },
        });

        return res.status(200).json({
            message: "Issue deleted successfully",
        });
    } catch (error) {
        console.error("Delete issue error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export {
    createIssue,
    getIssues,
    updateIssue,
    deleteIssue,
};