import { z } from "zod";

const projectStatusSchema = z.enum([
    "ACTIVE",
    "COMPLETED",
    "ON_HOLD",
]);

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(2, "Project name must be at least 2 characters")
        .max(100, "Project name must not exceed 100 characters"),

    description: z
        .string()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),

    status: projectStatusSchema.optional(),

    startDate: z
        .string()
        .datetime("Invalid start date")
        .optional(),

    deadline: z
        .string()
        .datetime("Invalid deadline")
        .optional(),
});

export const updateProjectSchema = createProjectSchema
    // makes every field optional
    .partial()
    // "Make sure the request contains at least one field."
    // But don't allow completely empty {}
    .refine(
        // data = request data
        // Object.keys(data) = the update fields sent in that request.
        // .length > 0 → at least one update field was sent.
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required",
        }
    );