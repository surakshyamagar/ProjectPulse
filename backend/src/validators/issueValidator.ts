import { z } from "zod";

const issueStatusSchema = z.enum([
    "OPEN",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
]);

const issuePrioritySchema = z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
]);

export const createIssueSchema = z.object({
    title: z
        .string()
        .min(2, "Issue title must be at least 2 characters")
        .max(200, "Issue title must not exceed 200 characters"),

    description: z
        .string()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),

    status: issueStatusSchema.optional(),

    priority: issuePrioritySchema.optional(),
});

export const updateIssueSchema = createIssueSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required",
        }
    );