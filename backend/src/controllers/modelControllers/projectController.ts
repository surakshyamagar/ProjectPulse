import prisma from "../../config/db";
import { createProjectSchema, updateProjectSchema } from "../../validators/projectValidator"
import {Request, Response} from "express";

const createProject = async (req: Request, res: Response) => {
    try{
        // Check request data using Zod
        const result = createProjectSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Get logged-in user's ID from JWT
        // JWT contains: {userId: user.id, name: user.name}
        // authmiddleware puts that into req.user = decoded
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const {name, description, status, startDate, deadline} = result.data;

        // Create project
        const project = await prisma.project.create({
            data: {
                userId,
                name,
                description,
                status,
                startDate: startDate ? new Date(startDate): undefined,
                deadline: deadline ? new Date(deadline): undefined,
            },
        });

        return res.status(201).json({
            message: "Project created successfully",
            data: project,
        });


    } catch (error) {
        console.error("Create project error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// GET projects
const getProjects = async (req: Request, res: Response) => {
    try {
        // Get logged-in user's ID from JWT
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Get all projects belonging to logged-in user
        const projects = await prisma.project.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            message: "Projects retrieved successfully",
            data: projects,
        });
    } catch (error) {
        console.error("Get projects error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// GET one project
const getProject = async (req: Request, res: Response) => {
    try {
        // Get logged-in user's ID
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const projectId = Number(req.params.id);

        // Check project ID
        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Find project owned by logged-in user
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

        return res.status(200).json({
            message: "Project retrieved successfully",
            data: project,
        });
    } catch (error) {
        console.error("Get project error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// UPDATE
const updateProject = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const projectId = Number(req.params.id);

        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Validate request body
        const result = updateProjectSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        // Check project belongs to logged-in user
        const existingProject = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId,
            },
        });

        if (!existingProject) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const {
            name,
            description,
            status,
            startDate,
            deadline,
        } = result.data;

        const project = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                name,
                description,
                status,
                startDate: startDate
                    ? new Date(startDate)
                    : undefined,
                deadline: deadline
                    ? new Date(deadline)
                    : undefined,
            },
        });

        return res.status(200).json({
            message: "Project updated successfully",
            data: project,
        });
    } catch (error) {
        console.error("Update project error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// DELETE
const deleteProject = async (req: Request, res: Response) => {
    try {
        // Get logged-in user's ID
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const projectId = Number(req.params.id);

        // Check project ID
        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Check ownership first
        const existingProject = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId,
            },
        });

        if (!existingProject) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        // Delete project
        await prisma.project.delete({
            where: {
                id: projectId,
            },
        });

        return res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Delete project error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


export {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
};