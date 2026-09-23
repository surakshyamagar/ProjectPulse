import { z } from "zod";

export const createMilestoneSchema = z.object({
    name: z
        .string()
        .min(2, "Milestone name must be at least 2 characters")
        .max(200, "Milestone name must not exceed 200 characters"),

    description: z
        .string()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),
});

export const updateMilestoneSchema = createMilestoneSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required",
        }
    );