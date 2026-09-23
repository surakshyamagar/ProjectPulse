import { Request, Response } from "express";
import { predictProjectRiskForProject } from "../../services/risk/riskService";

const getProjectRecommendations = async (
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

        // Get ML risk prediction and explanation
        const result =
            await predictProjectRiskForProject(
                projectId,
                userId
            );

        return res.status(200).json({
            message:
                "ML-based project recommendations generated successfully",

            data: {
                riskLevel:
                    result.prediction.risk_level,

                probabilities:
                    result.prediction.probabilities,

                riskFactors:
                    result.explanation.riskFactors,

                recommendations:
                    result.explanation.recommendedActions,
            },
        });

    } catch (error) {
        console.error(
            "Project recommendations error:",
            error
        );

        return res.status(500).json({
            message: "Failed to generate project recommendations",
        });
    }
};

export {
    getProjectRecommendations,
};