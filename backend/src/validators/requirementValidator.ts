import { z } from "zod";

const requirementStatusSchema = z.enum([
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
]);

export const createRequirementSchema = z.object({
    title: z
        .string()
        .min(2, "Requirement title must be at least 2 characters")
        .max(200, "Requirement title must not exceed 200 characters"),

    description: z
        .string()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),

    status: requirementStatusSchema.optional(),
});

export const updateRequirementSchema = createRequirementSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required",
        }
    );