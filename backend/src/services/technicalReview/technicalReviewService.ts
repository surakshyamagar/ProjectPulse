// Technical Review Service checks how many engineering practices the project has implemented and converts that into a score out of 100.

import prisma from "../../config/db";

export const PRACTICE_KEYS = [
  "AUTHENTICATION",
  "INPUT_VALIDATION",
  "ERROR_HANDLING",
  "RATE_LIMITING",
  "API_DOCUMENTATION",
  "INTEGRATION_TESTING",
  "SECURITY_HEADERS",
  "LOGGING",
] as const;

const TOTAL_PRACTICES = PRACTICE_KEYS.length;

// const TOTAL_PRACTICES = 8;

export const getTechnicalReviewScore = async (
  projectId: number
): Promise<number> => {
  const implementedCount = await prisma.projectPractice.count({
    where: {
      projectId,
      implemented: true,
    },
  });

  const score = Math.round(
    (implementedCount / TOTAL_PRACTICES) * 100
  );

  return score;
};