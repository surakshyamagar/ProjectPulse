// This service calculates issue-related project analytics.

// Calculate issue analytics
export const calculateIssueAnalytics = (
  issues: any[]
) => {

  // Count OPEN and IN_PROGRESS issues
  const openIssueCount = issues.filter(
    (issue) =>
      issue.status === "OPEN" ||
      issue.status === "IN_PROGRESS"
  ).length;

  // Count critical issues
  const criticalIssueCount = issues.filter(
    (issue) =>
      issue.priority === "CRITICAL"
  ).length;

  // Count critical issues that are still unresolved
  const unresolvedCriticalIssueCount = issues.filter(
    (issue) =>
      issue.priority === "CRITICAL" &&
      issue.status !== "RESOLVED" &&
      issue.status !== "CLOSED"
  ).length;

  return {
    openIssueCount,
    criticalIssueCount,
    unresolvedCriticalIssueCount,
  };
};