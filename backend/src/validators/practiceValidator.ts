import { z } from "zod";

export const practiceKeySchema = z.enum([
    "AUTHENTICATION",
    "INPUT_VALIDATION",
    "ERROR_HANDLING",
    "RATE_LIMITING",
    "API_DOCUMENTATION",
    "INTEGRATION_TESTING",
    "SECURITY_HEADERS",
    "LOGGING",
]);

export const createPracticeSchema = z.object({
    key: practiceKeySchema,

    implemented: z.boolean(),

    notes: z
        .string()
        .max(1000, "Notes must not exceed 1000 characters")
        .optional(),
});

export const updatePracticeSchema =
    createPracticeSchema.partial().refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required",
        }
    );