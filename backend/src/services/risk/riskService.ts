// This service prepares project data for risk prediction.
// It gets analytics, sends the data to ML,
// and creates a human-readable explanation.

import prisma from "../../config/db";
import { calculateApiTestAnalytics } from "../analytics/apiTestAnalyticsService";
import { calculateIssueAnalytics } from "../analytics/issueAnalyticsService";
import { calculateMilestoneAnalytics } from "../analytics/milestoneAnalyticsService";
import { calculateRequirementAnalytics } from "../analytics/requirementAnalyticsService";
import { calculateTaskAnalytics } from "../analytics/taskAnalyticsService";
import { predictProjectRisk } from "../ml/mlService";
import { getTechnicalReviewScore } from "../technicalReview/technicalReviewService";
import { generateRiskExplanation } from "./riskExplanationService";


// Predict risk for one project
export const predictProjectRiskForProject = async (projectId: number, userId: number) => {

  // 1. GET PROJECT DATA, requirements, tasks etc
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },

    include: {
      requirements: true,

      milestones: {
        include: {
          tasks: true,
        },
      },

      issues: true,

      apiTests: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  // 2. REQUIREMENT ANALYTICS
  const requirementAnalytics =
    calculateRequirementAnalytics(
      project.requirements
    );


  // 3. MILESTONE ANALYTICS
  const milestoneAnalytics =
    calculateMilestoneAnalytics(
      project.milestones
    );


  // 4. TASK ANALYTICS
  const taskAnalytics =
    calculateTaskAnalytics(
      project.milestones
    );


  // 5. ISSUE ANALYTICS
  const issueAnalytics =
    calculateIssueAnalytics(
      project.issues
    );


  // 6. API TEST ANALYTICS
  const apiTestAnalytics =
    calculateApiTestAnalytics(
      project.apiTests
    );

  // 7. PROJECT PROGRESS
  // Overall project progress:
    // Requirements = 30%
    // Milestones   = 30%
    // Tasks        = 40%
  const projectProgress =
    requirementAnalytics.requirementCompletionRate * 0.3 +
    milestoneAnalytics.milestoneCompletionRate * 0.3 +
    taskAnalytics.taskCompletionRate * 0.4;


  // 8. TECHNICAL REVIEW
  const technicalReviewScore =
    await getTechnicalReviewScore(
      projectId
    );


  // 9. DAYS REMAINING until the project deadline.
  const daysRemaining =
    project.deadline
      ? Math.max(
          0,
          Math.ceil(
            (
              project.deadline.getTime() -
              new Date().getTime()
            ) /
            (1000 * 60 * 60 * 24)
          )
        )
      : 0;


  // 10. PREPARE ML INPUT
  // Create the same 13 features that our ML model expects.
  const mlInput = {
    project_progress: projectProgress,

    // Task information
    task_completion_rate: taskAnalytics.taskCompletionRate,
    blocked_task_ratio: taskAnalytics.blockedTaskRatio,
    overdue_task_ratio: taskAnalytics.overdueTaskRatio,
    
    // Requirement and milestone information
    requirement_completion_rate: requirementAnalytics.requirementCompletionRate,
    milestone_completion_rate: milestoneAnalytics.milestoneCompletionRate,
    
    // Issue information
    open_issue_count: issueAnalytics.openIssueCount,
    critical_issue_count: issueAnalytics.criticalIssueCount,
    
    // API information
    api_test_failure_rate: apiTestAnalytics.apiTestFailureRate,
    avg_api_response_time_ms: apiTestAnalytics.averageApiResponseTime,
    
    // Engineering quality
    technical_review_score: technicalReviewScore,
    // Time information
    days_remaining: daysRemaining,
    // Development activity
    development_velocity: taskAnalytics.developmentVelocity,
  };


  // 11. SEND DATA TO PYTHON ML
  const prediction = await predictProjectRisk(mlInput);

  // 12. CREATE EXPLANATION
  const explanation = generateRiskExplanation(prediction);

  // 13. RETURN RESULT
  return {
    projectId,
    // Values calculated by Node
    features: mlInput,
    // Result from Python ML
    prediction,
    // Human-readable explanation
    explanation,
  };
};