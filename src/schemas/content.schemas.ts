import mongoose from "mongoose";
import { z } from "zod";
const ContentTypes = [
  "YOUTUBE",
  "TWITTER",
  "DOCUMENT",
  "LINK",
  "TAG",
  "CONTENT",
] as const;

export const contentSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  type: z // How to make sure type is one of the ContentTypes. So we can use refine() to apply a custom error message.
    .enum(ContentTypes)
    .refine((val) => ContentTypes.includes(val), {
      message: `Type must be one of ${ContentTypes.join(", ")}`,
    }),
  tags: z
    .array(z.string())
    .max(20, { message: "Tags must be at most 20 characters" })
    .optional(),
  link: z // How to make the link field optional but still validate as a URL if provided. So we can use z.preprocess() to handle empty strings as undefined before applying the .url() validation.
    .preprocess(
      (value) =>
        typeof value === "string" && value.trim() === "" ? undefined : value,
      z.string().url({ message: "Link must be a valid URL" }).optional()
    ),
  content: z
    .string()
    .max(1000, { message: "Content must be at most 1000 characters" })
    .optional(),
});

export type TContentSchema = z.infer<typeof contentSchema>;

export const deleteContentSchema = z.object({
  // How to make sure contentId is a valid ObjectId of mongoose: https://github.com/colinhacks/zod/issues/318
  contentId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid contentId",
  }),
});

export type TDeleteContentSchema = z.infer<typeof deleteContentSchema>;

export const updateContentSchema = z.object({
  contentId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid contentId",
  }),
  tags: z
    .array(z.string())
    .max(20, { message: "Tags must be at most 20 characters" })
    .optional(),
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  type: z // How to make sure type is one of the ContentTypes. So we can use refine() to apply a custom error message.
    .enum(ContentTypes)
    .refine((val) => ContentTypes.includes(val), {
      message: `Type must be one of ${ContentTypes.join(", ")}`,
    }),
  link: z // How to make the link field optional but still validate as a URL if provided. So we can use z.preprocess() to handle empty strings as undefined before applying the .url() validation.
    .preprocess(
      (value) =>
        typeof value === "string" && value.trim() === "" ? undefined : value,
      z.string().url({ message: "Link must be a valid URL" }).optional()
    ),
  content: z
    .string()
    .max(1000, { message: "Content must be at most 1000 characters" })
    .optional(),
});

export type TUpdateContentSchema = z.infer<typeof updateContentSchema>;
