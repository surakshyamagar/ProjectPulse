import { Request, Response } from "express";
import {predictProjectRiskForProject,} from "../../services/risk/riskService";

export const predictRisk = async (
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

    const projectId =
      Number(req.params.projectId);

    if (Number.isNaN(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const result =
      await predictProjectRiskForProject(
        projectId,
        userId
      );

    return res.status(200).json(result);
  } catch (error) {
    console.error(
      "Risk prediction error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to predict project risk",
    });
  }
};