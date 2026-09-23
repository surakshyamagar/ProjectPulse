// This service calculates the overall project health.

// Calculate project health
export const calculateProjectHealth = ({
  progress,
  unresolvedCriticalIssueCount,
  blockedTasks,
  openIssueCount,
  failedApiTests,
  passedApiTests,
}: {
  progress: number;
  unresolvedCriticalIssueCount: number;
  blockedTasks: number;
  openIssueCount: number;
  failedApiTests: number;
  passedApiTests: number;
}) => {

  // Store reasons why the project may have a problem
  const reasons: string[] = [];

  // AT RISK
  // Critical unresolved issue
  if (unresolvedCriticalIssueCount > 0) {
    reasons.push(
      "There are unresolved critical issues."
    );
  }

  // Three or more blocked tasks
  if (blockedTasks >= 3) {
    reasons.push(
      "There are 3 or more blocked tasks."
    );
  }

  // More failed API tests than passed tests
  if (failedApiTests > passedApiTests) {
    reasons.push(
      "Failed API tests are higher than passed API tests."
    );
  }

  // If any AT_RISK condition exists,
  // return AT_RISK immediately.
  if (reasons.length > 0) {
    return {
      status: "AT_RISK",
      reasons,
    };
  }

  // WARNING
  // Open issues are 3 or more
  if (openIssueCount >= 3) {
    reasons.push(
      "There are 3 or more open issues."
    );
  }

  // There is at least one blocked task
  if (blockedTasks > 0) {
    reasons.push(
      "There are blocked tasks."
    );
  }

  // Project progress is below 40%
  if (progress < 40) {
    reasons.push(
      "Project progress is below 40%."
    );
  }

  // If any WARNING condition exists
  if (reasons.length > 0) {
    return {
      status: "WARNING",
      reasons,
    };
  }

  // HEALTHY
  return {
    status: "HEALTHY",
    reasons: [],
  };
};