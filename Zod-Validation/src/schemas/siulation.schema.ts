import { z } from "zod";

const StatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"]);

const PlatformEnum = z.enum(["FACEBOOK", "INSTAGRAM", "TWITTER", "LINKEDIN"]);

export const simulationSchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1, "Content is required"),
  postUrl: z.string().url("Invalid URL format"),
  status: StatusEnum,
  userId: z.string().uuid("Invalid userId"),
  platform: PlatformEnum,
  impressions: z.number().int().nonnegative(),
  likesEstimate: z.number().int().nonnegative(),
  commentsEstimate: z.number().int().nonnegative(),
  summaryId: z.string().uuid().nullable().optional(),
});

export const updateSimulationSchema = simulationSchema.partial();
