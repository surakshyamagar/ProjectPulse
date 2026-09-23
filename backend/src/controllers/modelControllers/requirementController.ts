
import { Request, Response } from "express";
import prisma from "../../config/db";
import { createRequirementSchema, updateRequirementSchema } from "../../validators/requirementValidator";

// CREATE REQUIREMENT
// POST /api/projects/:projectId/requirements
const createRequirement = async (
    req: Request,
    res: Response
) => {
    try {
        // Validate request body
        const result = createRequirementSchema.safeParse(
            req.body
        );

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Get logged-in user's ID from JWT
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const projectId = Number(req.params.projectId);

        // Check project ID
        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Check project belongs to logged-in user
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
        } = result.data;

        // Create requirement
        const requirement =
            await prisma.requirement.create({
                data: {
                    projectId,
                    title,
                    description,
                    status,
                },
            });

        return res.status(201).json({
            message: "Requirement created successfully",
            data: requirement,
        });
    } catch (error) {
        console.error(
            "Create requirement error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// GET ALL REQUIREMENTS
// GET /api/projects/:projectId/requirements

const getRequirements = async (
    req: Request,
    res: Response
) => {
    try {
        // Get logged-in user's ID from JWT
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const projectId = Number(req.params.projectId);

        // Check project ID
        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Check project belongs to logged-in user
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

        // Get all requirements
        const requirements =
            await prisma.requirement.findMany({
                where: {
                    projectId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

        return res.status(200).json({
            message: "Requirements retrieved successfully",
            data: requirements,
        });
    } catch (error) {
        console.error(
            "Get requirements error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// UPDATE REQUIREMENT
// PATCH /api/requirements/:id

const updateRequirement = async (
    req: Request,
    res: Response
) => {
    try {
        // Get logged-in user's ID from JWT
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const requirementId = Number(req.params.id);

        // Check requirement ID
        if (Number.isNaN(requirementId)) {
            return res.status(400).json({
                message: "Invalid requirement ID",
            });
        }

        // Validate request body
        const result = updateRequirementSchema.safeParse(
            req.body
        );

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Check requirement belongs to logged-in user
        const existingRequirement =
            await prisma.requirement.findFirst({
                where: {
                    id: requirementId,
                    project: {
                        userId,
                    },
                },
            });

        if (!existingRequirement) {
            return res.status(404).json({
                message: "Requirement not found",
            });
        }

        const {
            title,
            description,
            status,
        } = result.data;

        // Update requirement
        const requirement =
            await prisma.requirement.update({
                where: {
                    id: requirementId,
                },
                data: {
                    title,
                    description,
                    status,
                },
            });

        return res.status(200).json({
            message: "Requirement updated successfully",
            data: requirement,
        });
    } catch (error) {
        console.error(
            "Update requirement error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// DELETE REQUIREMENT
// DELETE /api/requirements/:id

const deleteRequirement = async (
    req: Request,
    res: Response
) => {
    try {
        // Get logged-in user's ID from JWT
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const requirementId = Number(req.params.id);

        // Check requirement ID
        if (Number.isNaN(requirementId)) {
            return res.status(400).json({
                message: "Invalid requirement ID",
            });
        }

        // Check requirement belongs to logged-in user's project
        const existingRequirement =
            await prisma.requirement.findFirst({
                where: {
                    id: requirementId,
                    project: {
                        userId,
                    },
                },
            });

        if (!existingRequirement) {
            return res.status(404).json({
                message: "Requirement not found",
            });
        }

        // Delete requirement
        await prisma.requirement.delete({
            where: {
                id: requirementId,
            },
        });

        return res.status(200).json({
            message: "Requirement deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete requirement error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


export {
    createRequirement,
    getRequirements,
    updateRequirement,
    deleteRequirement,
};

