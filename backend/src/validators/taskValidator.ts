import { z } from "zod";

const taskStatusSchema = z.enum([
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
    "BLOCKED",
]);

const taskPrioritySchema = z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
]);

export const createTaskSchema = z.object({
    title: z
        .string()
        .min(2, "Task title must be at least 2 characters")
        .max(200, "Task title must not exceed 200 characters"),

    description: z
        .string()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),

    status: taskStatusSchema.optional(),

    priority: taskPrioritySchema.optional(),

    dueDate: z
        .string()
        .datetime("Invalid due date")
        .optional(),
});

export const updateTaskSchema = createTaskSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required",
        }
    );