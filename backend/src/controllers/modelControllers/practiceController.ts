// TechnicalReview & Practices

import { Request, Response } from "express";
import prisma from "../../config/db";
import {createPracticeSchema, updatePracticeSchema,} from "../../validators/practiceValidator";
import { PRACTICE_KEYS } from "../../services/technicalReview/technicalReviewService";

// CREATE / UPDATE PRACTICE
const savePractice = async (
    req: Request,
    res: Response
) => {
    try {
        const result = createPracticeSchema.safeParse(
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

        // upsert = Cha bhane update gara, chaina bhane create gara. (checklist)
        const practice = await prisma.projectPractice.upsert({
            where: {
                projectId_key: {
                    projectId,
                    key: result.data.key,
                },
            },

            update: {
                implemented: result.data.implemented,
                notes: result.data.notes,
            },

            create: {
                projectId,
                key: result.data.key,
                implemented: result.data.implemented,
                notes: result.data.notes,
            },
        });

        return res.status(200).json({
            message: "Practice saved successfully",
            data: practice,
        });
    } catch (error) {
        console.error("Save practice error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// GET PRACTICES
// GET /api/projects/:projectId/practices
const getPractices = async (
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

        const practices =
            await prisma.projectPractice.findMany({
                where: {
                    projectId,
                },
                orderBy: {
                    key: "asc",
                },
            });

        return res.status(200).json({
            message: "Practices retrieved successfully",
            data: practices,
        });
    } catch (error) {
        console.error("Get practices error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// TECHNICAL REVIEW
// GET /api/projects/:projectId/review

// Project -> Practices hercha -> Kun implemented? -> Kun missing? -> Score calculate -> Recommendations generate -> Frontend lai review return

const getTechnicalReview = async (
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

        // gets practices from DB
        const practices = await prisma.projectPractice.findMany({
                where: {
                    projectId,
                },
                orderBy: {
                    key: "asc",
                },
            });

        const implementedKeys = practices
            // implemented = true bhayeko matra rakha. (auth (true), login (false)))
            .filter((practice) => practice.implemented)
            // le object bata key matra lincha.
            .map((practice) => practice.key);


        // compares ALL practices : implemented practices : then missing
        const missingKeys = PRACTICE_KEYS.filter(
            (key) => !implementedKeys.includes(key)
        );

        // calculate Score: eg: implementedCount = 4
        const implementedCount =
            implementedKeys.length;

        // totalPractices = 8
        const totalPractices = PRACTICE_KEYS.length;

        // 4 / 8 × 100 = 50 50%
        const score = Math.round(
            (implementedCount / totalPractices) * 100
        );

        // simply empty list/array ho where later we keep recommendations
        //  Pachi missing practice anusar message haru add gardai jau."
        const recommendations: string[] = [];

        if (
            missingKeys.includes("RATE_LIMITING")
        ) {
            recommendations.push(
                "Add rate limiting to protect APIs from excessive requests."
            );
        }

        if (
            missingKeys.includes("API_DOCUMENTATION")
        ) {
            recommendations.push(
                "Add API documentation so endpoints are easier to understand and test."
            );
        }

        if (
            missingKeys.includes("INTEGRATION_TESTING")
        ) {
            recommendations.push(
                "Add integration tests for important application workflows."
            );
        }

        if (
            missingKeys.includes("INPUT_VALIDATION")
        ) {
            recommendations.push(
                "Add input validation to protect application boundaries."
            );
        }

        if (
            missingKeys.includes("ERROR_HANDLING")
        ) {
            recommendations.push(
                "Implement centralized error handling."
            );
        }

        if (
            missingKeys.includes("SECURITY_HEADERS")
        ) {
            recommendations.push(
                "Add security headers to improve application security."
            );
        }

        if (
            missingKeys.includes("LOGGING")
        ) {
            recommendations.push(
                "Add structured logging to improve debugging and observability."
            );
        }

        if (
            missingKeys.includes("AUTHENTICATION")
        ) {
            recommendations.push(
                "Implement secure user authentication."
            );
        }

        const implementedPractices =
            PRACTICE_KEYS.filter((key) =>
                implementedKeys.includes(key)
            );

        return res.status(200).json({
            message:
                "Technical review generated successfully",

            data: {
                score,
                totalPractices,
                implementedCount,
                missingCount: missingKeys.length,

                implementedPractices,

                missingPractices: missingKeys,

                recommendations,
            },
        });
    } catch (error) {
        console.error(
            "Technical review error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


// DELETE PRACTICE
// DELETE /api/practices/:id
const deletePractice = async (
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

        const practiceId = Number(req.params.id);

        if (Number.isNaN(practiceId)) {
            return res.status(400).json({
                message: "Invalid practice ID",
            });
        }

        const practice =
            await prisma.projectPractice.findFirst({
                where: {
                    id: practiceId,
                    project: {
                        userId,
                    },
                },
            });

        if (!practice) {
            return res.status(404).json({
                message: "Practice not found",
            });
        }

        await prisma.projectPractice.delete({
            where: {
                id: practiceId,
            },
        });

        return res.status(200).json({
            message: "Practice deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete practice error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export {
    savePractice,
    getPractices,
    getTechnicalReview,
    deletePractice,
};