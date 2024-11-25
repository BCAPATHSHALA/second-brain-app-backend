import { z } from "zod";

export const createSharedLinkSchema = z.object({
  share: z.boolean().default(false),
});

export type TCreateSharedLinkSchema = z.infer<typeof createSharedLinkSchema>;

export const getSharedLinkSchema = z.object({
  sharedHash: z
    .string()
    .min(10, { message: "Hash must be at least 10 characters" })
    .max(10, { message: "Hash must be at most 10 characters" }),
});

export type TGetSharedLinkSchema = z.infer<typeof getSharedLinkSchema>;
