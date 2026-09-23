// This service calculates task-related project analytics.

interface MilestoneWithTasks {
    tasks: {
        status:
            | "TODO"
            | "IN_PROGRESS"
            | "COMPLETED"
            | "BLOCKED";
        dueDate: Date | null;
    }[];
}

// Calculate task analytics
export const calculateTaskAnalytics = (
  milestones: MilestoneWithTasks[]
) => {

  // Get all tasks from all milestones
  const allTasks = milestones.flatMap(
    (milestone) => milestone.tasks
  );

  // Total number of tasks
  const totalTasks = allTasks.length;

  // Number of completed tasks
  const completedTasks = allTasks.filter(
    (task: any) =>
      task.status === "COMPLETED"
  ).length;

  // Number of blocked tasks
  const blockedTasks = allTasks.filter(
    (task: any) =>
      task.status === "BLOCKED"
  ).length;

  // Number of overdue tasks
  const overdueTasks = allTasks.filter(
    (task: any) => {

      // Task has no deadline
      if (!task.dueDate) {
        return false;
      }

      // Deadline has passed
      // and task is not completed
      return (
        task.dueDate < new Date() &&
        task.status !== "COMPLETED"
      );
    }
  ).length;

  // Task completion percentage
  const taskCompletionRate =
    totalTasks === 0
      ? 0
      : (completedTasks / totalTasks) * 100;

  // Percentage of tasks that are blocked
  const blockedTaskRatio =
    totalTasks === 0
      ? 0
      : blockedTasks / totalTasks;

  // Percentage of tasks that are overdue
  const overdueTaskRatio =
    totalTasks === 0
      ? 0
      : overdueTasks / totalTasks;

  // Number of completed tasks.
  //
  // This is NOT true time-based development velocity.
  // We are using completed task count as a
  // development activity feature for now.
  const developmentVelocity =
    completedTasks;

  return {
    allTasks,
    totalTasks,
    completedTasks,
    blockedTasks,
    overdueTasks,
    taskCompletionRate,
    blockedTaskRatio,
    overdueTaskRatio,
    developmentVelocity,
  };
};