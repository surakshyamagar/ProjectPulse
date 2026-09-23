import { Request, Response } from "express";
import prisma from "../../config/db";
import { getTechnicalReviewScore } from "../../services/technicalReview/technicalReviewService";
import { calculateMilestoneAnalytics } from "../../services/analytics/milestoneAnalyticsService";

const getProjectAnalytics = async (
    req: Request,
    res: Response
) => {
    try {
        // Get the ID of the currently logged-in user
        const userId = req.user?.userId;

        // If there is no logged-in user, stop the request
        if (!userId) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        // Get project ID from the URL
        // Example: /api/projects/1/analytics
        // req.params.projectId = "1"
        // Number() converts "1" into 1
        const projectId = Number(req.params.projectId);

        // Check if the project ID is a valid number
        if (Number.isNaN(projectId)) {
            return res.status(400).json({
                message: "Invalid project ID",
            });
        }

        // Find the project that belongs to the logged-in user
        // This also prevents a user from viewing another user's project
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId,
            },
        });

        // If the project does not exist or does not belong to this user
        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        // ==========================================
        // GET PROJECT DATA
        // ==========================================

        // Get all requirements of this project
        const requirements =
            await prisma.requirement.findMany({
                where: {
                    projectId,
                },
            });

        // Get all milestones of this project
        // Include tasks because milestone completion
        // is determined by its tasks.
        const milestones =
            await prisma.milestone.findMany({
                where: {
                    projectId,
                },
                include: {
                    tasks: true,
                },
            });

        // Get all tasks that belong to this project
        // Task belongs to Milestone,
        // and Milestone belongs to Project
        const tasks = await prisma.task.findMany({
            where: {
                milestone: {
                    projectId,
                },
            },
        });

        // Get all issues of this project
        const issues = await prisma.issue.findMany({
            where: {
                projectId,
            },
        });

        // Get all API tests of this project
        const apiTests = await prisma.apiTest.findMany({
            where: {
                projectId,
            },
        });

        // ==========================================
        // REQUIREMENTS ANALYTICS
        // ==========================================

        // Count all requirements
        const totalRequirements = requirements.length;

        // Count only completed requirements
        const completedRequirements =
            requirements.filter(
                (requirement) =>
                    requirement.status === "COMPLETED"
            ).length;

        // Calculate requirement completion percentage
        // Example: 2 completed out of 4 = 50%
        const requirementCompletionRate =
            totalRequirements > 0
                ? Number(
                      (
                          (completedRequirements /
                              totalRequirements) *
                          100
                      ).toFixed(2)
                  )
                : 0;

        // ==========================================
        // TASK ANALYTICS
        // ==========================================

        // Count all tasks
        const totalTasks = tasks.length;

        // Count completed tasks
        const completedTasks = tasks.filter(
            (task) => task.status === "COMPLETED"
        ).length;

        // Count tasks currently being worked on
        const inProgressTasks = tasks.filter(
            (task) =>
                task.status === "IN_PROGRESS"
        ).length;

        // Count tasks that have not started
        const todoTasks = tasks.filter(
            (task) => task.status === "TODO"
        ).length;

        // Count blocked tasks
        const blockedTasks = tasks.filter(
            (task) => task.status === "BLOCKED"
        ).length;

        // Count overdue tasks
        //
        // A task is overdue when:
        // 1. It has a due date
        // 2. It is not completed
        // 3. Its due date has already passed
        const overdueTasks = tasks.filter((task) => {
            // If there is no due date, it cannot be overdue
            if (!task.dueDate) {
                return false;
            }

            // Completed tasks are not considered overdue
            if (task.status === "COMPLETED") {
                return false;
            }

            // Check if the due date is before the current date/time
            return new Date(task.dueDate) < new Date();
        }).length;

        // Calculate task completion percentage
        // Example: 5 completed out of 10 = 50%
        const taskCompletionRate =
            totalTasks > 0
                ? Number(
                      (
                          (completedTasks /
                              totalTasks) *
                          100
                      ).toFixed(2)
                  )
                : 0;

        // For now, project progress is based on task completion
        const projectProgress = taskCompletionRate;

        // ==========================================
        // MILESTONE ANALYTICS
        // ==========================================

        // Milestone completion is calculated
        // inside the milestone analytics service.
        //
        // A milestone is completed when:
        // - It has at least one task
        // - All of its tasks are COMPLETED
        const milestoneAnalytics =
            calculateMilestoneAnalytics(
                milestones
            );

        const {
            totalMilestones,
            completedMilestones,
            milestoneCompletionRate,
        } = milestoneAnalytics;

        // ==========================================
        // ISSUE ANALYTICS
        // ==========================================

        // Count all issues
        const totalIssues = issues.length;

        // Count open issues
        const openIssues = issues.filter(
            (issue) => issue.status === "OPEN"
        ).length;

        // Count issues currently being worked on
        const inProgressIssues = issues.filter(
            (issue) =>
                issue.status === "IN_PROGRESS"
        ).length;

        // Count resolved issues
        const resolvedIssues = issues.filter(
            (issue) =>
                issue.status === "RESOLVED"
        ).length;

        // Count closed issues
        const closedIssues = issues.filter(
            (issue) =>
                issue.status === "CLOSED"
        ).length;

        // Count unresolved critical issues
        //
        // Critical + OPEN = counted
        // Critical + IN_PROGRESS = counted
        // Critical + RESOLVED = not counted
        // Critical + CLOSED = not counted
        const criticalIssues = issues.filter(
            (issue) =>
                issue.priority === "CRITICAL" &&
                issue.status !== "RESOLVED" &&
                issue.status !== "CLOSED"
        ).length;

        // Count high-priority issues
        const highIssues = issues.filter(
            (issue) =>
                issue.priority === "HIGH"
        ).length;

        // ==========================================
        // API TEST ANALYTICS
        // ==========================================

        // Count all API tests
        const totalApiTests = apiTests.length;

        // Count passed API tests
        const passedApiTests = apiTests.filter(
            (test) => test.passed
        ).length;

        // Count failed API tests
        const failedApiTests = apiTests.filter(
            (test) => !test.passed
        ).length;

        // Calculate API failure percentage
        // Example: 2 failed out of 10 = 20%
        const apiFailureRate =
            totalApiTests > 0
                ? Number(
                      (
                          (failedApiTests /
                              totalApiTests) *
                          100
                      ).toFixed(2)
                  )
                : 0;

        // Calculate average API response time
        //
        // Example:
        // 100ms + 200ms + 300ms = 600ms
        // 600 / 3 tests = 200ms average
        const averageApiResponseTime =
            totalApiTests > 0
                ? Number(
                      (
                          apiTests.reduce(
                              (sum, test) =>
                                  sum +
                                  test.responseTime,
                              0
                          ) / totalApiTests
                      ).toFixed(2)
                  )
                : 0;

        // ==========================================
        // TECHNICAL REVIEW
        // ==========================================

        // Calculate technical review score
        // using the technical review service.
        const technicalReviewScore =
            await getTechnicalReviewScore(
                projectId
            );

        // ==========================================
        // PROJECT HEALTH
        // ==========================================

        // Project health can be:
        // HEALTHY
        // WARNING
        // AT_RISK
        let projectHealth:
            | "HEALTHY"
            | "WARNING"
            | "AT_RISK";

        // Store explanations for the health status
        const healthReasons: string[] = [];

        // ------------------------------------------
        // AT_RISK CONDITIONS
        // ------------------------------------------

        // If there is at least one unresolved critical issue
        if (criticalIssues > 0) {
            healthReasons.push(
                "Critical unresolved issues exist"
            );
        }

        // If 3 or more tasks are blocked
        if (blockedTasks >= 3) {
            healthReasons.push(
                "Three or more tasks are blocked"
            );
        }

        // If failed API tests are greater than passed tests
        if (failedApiTests > passedApiTests) {
            healthReasons.push(
                "Failed API tests exceed passed tests"
            );
        }

        // If any AT_RISK condition is true
        // project becomes AT_RISK
        if (
            criticalIssues > 0 ||
            blockedTasks >= 3 ||
            failedApiTests > passedApiTests
        ) {
            projectHealth = "AT_RISK";
        } else {
            // ------------------------------------------
            // WARNING CONDITIONS
            // ------------------------------------------

            // 3 or more open issues
            if (openIssues >= 3) {
                healthReasons.push(
                    "There are three or more open issues"
                );
            }

            // At least one blocked task
            if (blockedTasks > 0) {
                healthReasons.push(
                    "There are blocked tasks"
                );
            }

            // Project progress below 40%
            if (projectProgress < 40) {
                healthReasons.push(
                    "Project progress is below 40%"
                );
            }

            // If any WARNING condition is true
            if (
                openIssues >= 3 ||
                blockedTasks > 0 ||
                projectProgress < 40
            ) {
                projectHealth = "WARNING";
            } else {
                // If no warning or risk condition exists
                projectHealth = "HEALTHY";
            }
        }

        // ==========================================
        // SEND ANALYTICS TO FRONTEND
        // ==========================================

        return res.status(200).json({
            message:
                "Project analytics retrieved successfully",

            data: {
                // Basic project information
                project: {
                    id: project.id,
                    name: project.name,
                    status: project.status,
                    deadline: project.deadline,
                },

                // Overall project progress
                progress: {
                    projectProgress,
                    completedTasks,
                    totalTasks,
                },

                // Requirement statistics
                requirements: {
                    total: totalRequirements,
                    completed:
                        completedRequirements,
                    completionRate:
                        requirementCompletionRate,
                },

                // Milestone statistics
                milestones: {
                    total: totalMilestones,
                    completed:
                        completedMilestones,
                    completionRate:
                        milestoneCompletionRate,
                },

                // Task statistics
                tasks: {
                    total: totalTasks,
                    completed: completedTasks,
                    inProgress: inProgressTasks,
                    todo: todoTasks,
                    blocked: blockedTasks,
                    overdue: overdueTasks,
                    completionRate:
                        taskCompletionRate,
                },

                // Issue statistics
                issues: {
                    total: totalIssues,
                    open: openIssues,
                    inProgress: inProgressIssues,
                    resolved: resolvedIssues,
                    closed: closedIssues,
                    critical: criticalIssues,
                    high: highIssues,
                },

                // API testing statistics
                apiTests: {
                    total: totalApiTests,
                    passed: passedApiTests,
                    failed: failedApiTests,
                    failureRate:
                        apiFailureRate,
                    averageResponseTime:
                        averageApiResponseTime,
                },

                // Technical engineering review score
                technicalReview: {
                    score:
                        technicalReviewScore,
                },

                // Overall project health
                health: {
                    status: projectHealth,
                    reasons: healthReasons,
                },
            },
        });
    } catch (error) {
        // If an unexpected server/database error happens
        console.error(
            "Project analytics error:",
            error
        );

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export {
    getProjectAnalytics,
};