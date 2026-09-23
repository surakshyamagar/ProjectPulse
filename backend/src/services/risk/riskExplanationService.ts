import type {
    MLRiskFactor,
    RiskPrediction,
} from "../ml/mlService";

// ============================================
// Risk factor returned to frontend
// ============================================

export interface RiskFactor {
    factor: string;
    value: number;

    // Presentation priority based on SHAP contribution
    // ranking. This is not an objective real-world
    // severity measurement.
    severity: "HIGH" | "MEDIUM" | "LOW";

    explanation: string;
}

// ============================================
// Recommended action
// ============================================

export interface RecommendedAction {
    priority: "HIGH" | "MEDIUM" | "LOW";
    action: string;
    reason: string;
}

// ============================================
// Human-readable feature information
// ============================================

const featureInformation: Record<
    string,
    {
        name: string;
        explanation: string;
        action: string;
        reason: string;
    }
> = {
    project_progress: {
        name: "Project progress",
        explanation:
            "Project progress is contributing to the current ML risk prediction.",
        action:
            "Increase project development progress",
        reason:
            "Focus on completing important remaining requirements, milestones, and tasks.",
    },

    task_completion_rate: {
        name: "Task completion rate",
        explanation:
            "Task completion is influencing the current ML risk prediction.",
        action:
            "Prioritize pending development tasks",
        reason:
            "Completing important pending tasks can improve overall project progress.",
    },

    blocked_task_ratio: {
        name: "Blocked task ratio",
        explanation:
            "The proportion of blocked tasks is influencing the current ML risk prediction.",
        action:
            "Resolve blocked development tasks",
        reason:
            "Removing blockers can allow dependent development work to continue.",
    },

    overdue_task_ratio: {
        name: "Overdue task ratio",
        explanation:
            "Overdue tasks are influencing the current ML risk prediction.",
        action:
            "Review and prioritize overdue tasks",
        reason:
            "Addressing delayed tasks can help prevent further development delays.",
    },

    requirement_completion_rate: {
        name: "Requirement completion rate",
        explanation:
            "Requirement completion is influencing the current ML risk prediction.",
        action:
            "Prioritize incomplete requirements",
        reason:
            "Completing important requirements provides a stronger foundation for development.",
    },

    milestone_completion_rate: {
        name: "Milestone completion rate",
        explanation:
            "Milestone completion is influencing the current ML risk prediction.",
        action:
            "Prioritize incomplete milestones",
        reason:
            "Progressing toward milestone completion provides measurable development progress.",
    },

    open_issue_count: {
        name: "Open issue count",
        explanation:
            "The number of unresolved issues is influencing the current ML risk prediction.",
        action:
            "Review and prioritize open issues",
        reason:
            "Reducing unresolved issues can improve project stability.",
    },

    critical_issue_count: {
        name: "Critical issue count",
        explanation:
            "Critical issues are strongly influencing the current ML risk prediction.",
        action:
            "Prioritize critical issues",
        reason:
            "Resolving critical issues can reduce threats to project stability and delivery.",
    },

    api_test_failure_rate: {
        name: "API test failure rate",
        explanation:
            "API test results are influencing the current ML risk prediction.",
        action:
            "Review failing API tests",
        reason:
            "Investigating failing API tests can improve backend reliability and integration quality.",
    },

    avg_api_response_time_ms: {
        name: "Average API response time",
        explanation:
            "API response performance is influencing the current ML risk prediction.",
        action:
            "Review API performance",
        reason:
            "Investigating slow API responses can help improve backend performance.",
    },

    technical_review_score: {
        name: "Technical review score",
        explanation:
            "The technical engineering practice score is influencing the current ML risk prediction.",
        action:
            "Improve engineering practices",
        reason:
            "Strengthening engineering practices can improve project quality and maintainability.",
    },

    days_remaining: {
        name: "Days remaining",
        explanation:
            "The remaining project time is influencing the ML risk prediction.",
        action:
            "Prioritize essential delivery work",
        reason:
            "Focusing on important remaining work can help keep the project on track.",
    },

    development_velocity: {
        name: "Development velocity",
        explanation:
            "Development activity is influencing the current ML risk prediction.",
        action:
            "Maintain consistent development activity",
        reason:
            "Consistent development progress can help maintain project momentum.",
    },
};

// ============================================
// Get presentation priority
// ============================================

const getContributionPriority = (
    index: number
): "HIGH" | "MEDIUM" | "LOW" => {
    if (index === 0) {
        return "HIGH";
    }

    if (index <= 2) {
        return "MEDIUM";
    }

    return "LOW";
};

// ============================================
// Convert raw ML factor into readable factor
// ============================================

const createRiskFactor = (
    mlFactor: MLRiskFactor,
    index: number
): RiskFactor => {
    const information =
        featureInformation[mlFactor.feature];

    const factorName =
        information?.name ??
        mlFactor.feature;

    const severity =
        getContributionPriority(index);

    let explanation =
        information?.explanation ??
        `${factorName} is influencing the current ML risk prediction.`;

    // SHAP impact is calculated for the predicted class.
    //
    // Positive impact:
    // contributes toward the predicted class.
    //
    // Negative impact:
    // contributes away from the predicted class.

    if (mlFactor.impact > 0) {
        explanation =
            information?.explanation ??
            `${factorName} is contributing toward the predicted risk level.`;
    } else if (mlFactor.impact < 0) {
        explanation =
            `${factorName} is contributing in a direction that reduces the predicted risk level.`;
    }

    return {
        factor: factorName,
        value: mlFactor.value,
        severity,
        explanation,
    };
};

// ============================================
// Create recommendation from ML factor
// ============================================

const createRecommendation = (
    mlFactor: MLRiskFactor,
    index: number
): RecommendedAction | null => {
    // Only positive SHAP contributors generate
    // corrective recommendations.
    //
    // A negative contribution does not mean the
    // feature is unimportant. It only means that
    // its current contribution moves away from
    // the predicted risk class.

    if (mlFactor.impact <= 0) {
        return null;
    }

    const information =
        featureInformation[mlFactor.feature];

    if (!information) {
        return null;
    }

    const priority =
        getContributionPriority(index);

    return {
        priority,
        action: information.action,
        reason: information.reason,
    };
};

// ============================================
// Generate ML-based risk explanation
// ============================================

export const generateRiskExplanation = (
    prediction: RiskPrediction
) => {
    const mlFactors =
        prediction.risk_factors ?? [];

    const riskFactors = mlFactors.map(
        (mlFactor, index) =>
            createRiskFactor(
                mlFactor,
                index
            )
    );

    const recommendedActions =
        mlFactors
            .map((mlFactor, index) =>
                createRecommendation(
                    mlFactor,
                    index
                )
            )
            .filter(
                (
                    action
                ): action is RecommendedAction =>
                    action !== null
            );

    return {
        riskLevel: prediction.risk_level,

        summary: getRiskSummary(
            prediction.risk_level
        ),

        riskFactors,

        recommendedActions,
    };
};

// ============================================
// Risk summary
// ============================================

const getRiskSummary = (
    riskLevel:
        | "LOW"
        | "MEDIUM"
        | "HIGH"
) => {
    if (riskLevel === "HIGH") {
        return "The ML model predicts a high level of project risk. The strongest contributing factors should be addressed first.";
    }

    if (riskLevel === "MEDIUM") {
        return "The ML model predicts a moderate level of project risk. The strongest contributing factors should be monitored and addressed.";
    }

    return "The ML model predicts a low level of project risk based on the current project data.";
};


// import type {
//     MLRiskFactor,
//     RiskPrediction,
// } from "../ml/mlService";

// // ============================================
// // Risk factor returned to frontend
// // ============================================

// export interface RiskFactor {
//     factor: string;
//     value: number;

//     // Presentation importance based on SHAP ranking.
//     // This is NOT an objective real-world severity.
//     severity: "HIGH" | "MEDIUM" | "LOW";

//     explanation: string;
// }

// // ============================================
// // Recommended action
// // ============================================

// export interface RecommendedAction {
//     priority: "HIGH" | "MEDIUM" | "LOW";
//     action: string;
//     reason: string;
// }

// // ============================================
// // Human-readable feature information
// // ============================================

// const featureInformation: Record<
//     string,
//     {
//         name: string;
//         explanation: string;
//         action: string;
//         reason: string;
//     }
// > = {
//     project_progress: {
//         name: "Project progress",
//         explanation:
//             "Project progress is influencing the current ML risk prediction.",
//         action:
//             "Increase project development progress",
//         reason:
//             "Focus on completing important remaining requirements, milestones, and tasks.",
//     },

//     task_completion_rate: {
//         name: "Task completion rate",
//         explanation:
//             "Task completion rate is influencing the current ML risk prediction.",
//         action:
//             "Prioritize pending development tasks",
//         reason:
//             "Completing important pending tasks can improve overall project progress.",
//     },

//     blocked_task_ratio: {
//         name: "Blocked task ratio",
//         explanation:
//             "The proportion of blocked tasks is influencing the current ML risk prediction.",
//         action:
//             "Resolve blocked development tasks",
//         reason:
//             "Removing blockers can allow dependent development work to continue.",
//     },

//     overdue_task_ratio: {
//         name: "Overdue task ratio",
//         explanation:
//             "The proportion of overdue tasks is influencing the current ML risk prediction.",
//         action:
//             "Review and prioritize overdue tasks",
//         reason:
//             "Addressing delayed tasks can help prevent further development delays.",
//     },

//     requirement_completion_rate: {
//         name: "Requirement completion rate",
//         explanation:
//             "Requirement completion rate is influencing the current ML risk prediction.",
//         action:
//             "Prioritize incomplete requirements",
//         reason:
//             "Completing important requirements provides a stronger foundation for development.",
//     },

//     milestone_completion_rate: {
//         name: "Milestone completion rate",
//         explanation:
//             "Milestone completion rate is influencing the current ML risk prediction.",
//         action:
//             "Prioritize incomplete milestones",
//         reason:
//             "Progressing toward milestone completion provides measurable development progress.",
//     },

//     open_issue_count: {
//         name: "Open issue count",
//         explanation:
//             "The number of unresolved issues is influencing the current ML risk prediction.",
//         action:
//             "Review and prioritize open issues",
//         reason:
//             "Reducing unresolved issues can improve project stability.",
//     },

//     critical_issue_count: {
//         name: "Critical issue count",
//         explanation:
//             "Critical issues are strongly influencing the current ML risk prediction.",
//         action:
//             "Prioritize critical issues",
//         reason:
//             "Resolving critical issues can reduce threats to project stability and delivery.",
//     },

//     api_test_failure_rate: {
//         name: "API test failure rate",
//         explanation:
//             "API test failure rate is influencing the current ML risk prediction.",
//         action:
//             "Review failing API tests",
//         reason:
//             "Investigating failing API tests can improve backend reliability and integration quality.",
//     },

//     avg_api_response_time_ms: {
//         name: "Average API response time",
//         explanation:
//             "API response performance is influencing the current ML risk prediction.",
//         action:
//             "Review API performance",
//         reason:
//             "Investigating slow API responses can help improve backend performance.",
//     },

//     technical_review_score: {
//         name: "Technical review score",
//         explanation:
//             "The technical engineering practice score is influencing the current ML risk prediction.",
//         action:
//             "Improve engineering practices",
//         reason:
//             "Strengthening engineering practices can improve project quality and maintainability.",
//     },

//     days_remaining: {
//         name: "Days remaining",
//         explanation:
//             "The remaining project time is influencing the ML risk prediction.",
//         action:
//             "Prioritize essential delivery work",
//         reason:
//             "Focusing on important remaining work can help keep the project on track.",
//     },

//     development_velocity: {
//         name: "Development velocity",
//         explanation:
//             "Development velocity is influencing the current ML risk prediction.",
//         action:
//             "Maintain consistent development activity",
//         reason:
//             "Consistent development progress can help maintain project momentum.",
//     },
// };

// // ============================================
// // Get presentation priority
// // ============================================

// const getContributionPriority = (
//     index: number
// ): "HIGH" | "MEDIUM" | "LOW" => {
//     if (index === 0) {
//         return "HIGH";
//     }

//     if (index <= 2) {
//         return "MEDIUM";
//     }

//     return "LOW";
// };

// // ============================================
// // Determine whether the actual metric value
// // represents an engineering concern.
// //
// // SHAP explains model influence.
// // The metric value determines whether an
// // engineering action is appropriate.
// // ============================================

// const isActionableRiskValue = (
//     feature: string,
//     value: number
// ): boolean => {
//     switch (feature) {
//         case "project_progress":
//             return value < 60;

//         case "task_completion_rate":
//             return value < 60;

//         case "blocked_task_ratio":
//             return value > 0.2;

//         case "overdue_task_ratio":
//             return value > 0.2;

//         case "requirement_completion_rate":
//             return value < 60;

//         case "milestone_completion_rate":
//             return value < 60;

//         case "open_issue_count":
//             return value >= 3;

//         case "critical_issue_count":
//             return value > 0;

//         case "api_test_failure_rate":
//             return value > 0.2;

//         case "avg_api_response_time_ms":
//             return value > 500;

//         case "technical_review_score":
//             return value < 70;

//         case "days_remaining":
//             return value < 14;

//         case "development_velocity":
//             return value <= 0;

//         default:
//             return false;
//     }
// };

// // ============================================
// // Convert ML factor into readable factor
// // ============================================

// const createRiskFactor = (
//     mlFactor: MLRiskFactor,
//     index: number,
//     riskLevel: RiskPrediction["risk_level"]
// ): RiskFactor => {
//     const information =
//         featureInformation[mlFactor.feature];

//     const factorName =
//         information?.name ??
//         mlFactor.feature;

//     const severity =
//         getContributionPriority(index);

//     let explanation =
//         information?.explanation ??
//         `${factorName} is influencing the current ML risk prediction.`;

//     // SHAP interpretation:
//     //
//     // Positive SHAP:
//     // pushes the prediction toward the predicted class.
//     //
//     // Negative SHAP:
//     // pushes the prediction away from the predicted class.
//     //
//     // Positive SHAP does NOT automatically mean
//     // that the feature is bad or risky.

//     if (mlFactor.impact > 0) {
//         explanation =
//             `${factorName} is contributing toward the predicted ${riskLevel} risk class.`;
//     } else if (mlFactor.impact < 0) {
//         explanation =
//             `${factorName} is contributing away from the predicted ${riskLevel} risk class.`;
//     }

//     return {
//         factor: factorName,
//         value: mlFactor.value,
//         severity,
//         explanation,
//     };
// };

// // ============================================
// // Create recommendation
// // ============================================

// const createRecommendation = (
//     mlFactor: MLRiskFactor,
//     index: number,
//     riskLevel: RiskPrediction["risk_level"]
// ): RecommendedAction | null => {
//     const information =
//         featureInformation[mlFactor.feature];

//     if (!information) {
//         return null;
//     }

//     // Recommendations are generated only when:
//     //
//     // 1. The predicted risk class is MEDIUM or HIGH.
//     // 2. The feature contributes toward that class.
//     // 3. The actual metric value represents an
//     //    actionable engineering concern.
//     //
//     // This prevents positive SHAP values from
//     // automatically being interpreted as bad.

//     const contributesToRisk =
//         riskLevel === "HIGH" ||
//         riskLevel === "MEDIUM";

//     const actionable =
//         isActionableRiskValue(
//             mlFactor.feature,
//             mlFactor.value
//         );

//     if (
//         !contributesToRisk ||
//         mlFactor.impact <= 0 ||
//         !actionable
//     ) {
//         return null;
//     }

//     return {
//         priority:
//             getContributionPriority(index),

//         action:
//             information.action,

//         reason:
//             information.reason,
//     };
// };

// // ============================================
// // Generate ML-based risk explanation
// // ============================================

// export const generateRiskExplanation = (
//     prediction: RiskPrediction
// ) => {
//     const mlFactors =
//         prediction.risk_factors ?? [];

//     const riskFactors =
//         mlFactors.map(
//             (mlFactor, index) =>
//                 createRiskFactor(
//                     mlFactor,
//                     index,
//                     prediction.risk_level
//                 )
//         );

//     const recommendedActions =
//         mlFactors
//             .map(
//                 (mlFactor, index) =>
//                     createRecommendation(
//                         mlFactor,
//                         index,
//                         prediction.risk_level
//                     )
//             )
//             .filter(
//                 (
//                     action
//                 ): action is RecommendedAction =>
//                     action !== null
//             );

//     return {
//         riskLevel:
//             prediction.risk_level,

//         summary:
//             getRiskSummary(
//                 prediction.risk_level
//             ),

//         riskFactors,

//         recommendedActions,
//     };
// };

// // ============================================
// // Risk summary
// // ============================================

// const getRiskSummary = (
//     riskLevel:
//         | "LOW"
//         | "MEDIUM"
//         | "HIGH"
// ) => {
//     if (riskLevel === "HIGH") {
//         return "The ML model predicts a high level of project risk. The strongest contributing factors should be addressed first.";
//     }

//     if (riskLevel === "MEDIUM") {
//         return "The ML model predicts a moderate level of project risk. The strongest contributing factors should be monitored and addressed.";
//     }

//     return "The ML model predicts a low level of project risk based on the current project data.";
// };
