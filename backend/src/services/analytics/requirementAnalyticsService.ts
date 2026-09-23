// This service calculates requirement-related project analytics.

import type { Requirement } from "@prisma/client";

// Calculate requirement analytics
export const calculateRequirementAnalytics = (
  requirements: Requirement[]
) => {

  // Total number of requirements
  const totalRequirements = requirements.length;

  // Number of completed requirements
  const completedRequirements = requirements.filter(
    (requirement) =>
      requirement.status === "COMPLETED"
  ).length;

  // Requirement completion percentage
  const requirementCompletionRate =
    totalRequirements === 0
      ? 0
      : (completedRequirements / totalRequirements) * 100;

  return {
    totalRequirements,
    completedRequirements,
    requirementCompletionRate,
  };
};