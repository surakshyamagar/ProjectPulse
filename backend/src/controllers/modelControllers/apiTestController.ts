import { Request, Response } from "express";
import prisma from "../../config/db";
import { createApiTestSchema } from "../../validators/apiTestValidator";

// ==========================================
// CREATE API TEST
// POST /api/projects/:projectId/api-tests
// ==========================================

const createApiTest = async (
    req: Request,
    res: Response
) => {
    try {
        const result = createApiTestSchema.safeParse(
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

        const {
            endpoint,
            method,
            statusCode,
            passed,
            responseTime,
            testedAt,
        } = result.data;

        const apiTest = await prisma.apiTest.create({
            data: {
                projectId,
                endpoint,
                method,
                statusCode,
                passed,
                responseTime,
                testedAt: testedAt
                    ? new Date(testedAt)
                    : undefined,
            },
        });

        return res.status(201).json({
            message: "API test recorded successfully",
            data: apiTest,
        });
    } catch (error) {
        console.error(
            "Create API test error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// ==========================================
// GET API TESTS
// GET /api/projects/:projectId/api-tests
// ==========================================

const getApiTests = async (
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

        const apiTests = await prisma.apiTest.findMany({
            where: {
                projectId,
            },
            orderBy: {
                testedAt: "desc",
            },
        });

        return res.status(200).json({
            message: "API tests retrieved successfully",
            data: apiTests,
        });
    } catch (error) {
        console.error(
            "Get API tests error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export {
    createApiTest,
    getApiTests,
};