import { z } from "zod";

export const createApiTestSchema = z.object({
    endpoint: z
        .string()
        .min(1, "Endpoint is required"),

    method: z
        .string()
        .min(1, "HTTP method is required")
        .transform((value) => value.toUpperCase()),

    statusCode: z
        .number()
        .int()
        .min(100)
        .max(599),

    passed: z.boolean(),

    responseTime: z
        .number()
        .int()
        .min(0, "Response time cannot be negative"),

    testedAt: z
        .string()
        .datetime()
        .optional(),
});