// This service calculates milestone-related project analytics.

interface MilestoneWithTasks {
    tasks: {
        status:
            | "TODO"
            | "IN_PROGRESS"
            | "COMPLETED"
            | "BLOCKED";
    }[];
}

// Calculate milestone analytics
export const calculateMilestoneAnalytics = (
    milestones: MilestoneWithTasks[]
) => {
    // Total number of milestones
    const totalMilestones = milestones.length;

    // Count completed milestones
    const completedMilestones = milestones.filter(
        (milestone) => {
            // Get tasks belonging to this milestone
            const tasks = milestone.tasks;

            // A milestone with no tasks is not completed
            if (tasks.length === 0) {
                return false;
            }

            // A milestone is completed
            // when all of its tasks are completed.
            return tasks.every(
                (task) => task.status === "COMPLETED"
            );
        }
    ).length;

    // Milestone completion percentage
    const milestoneCompletionRate =
        totalMilestones === 0
            ? 0
            : Number(
                  (
                      (completedMilestones /
                          totalMilestones) *
                      100
                  ).toFixed(2)
              );

    return {
        totalMilestones,
        completedMilestones,
        milestoneCompletionRate,
    };
};