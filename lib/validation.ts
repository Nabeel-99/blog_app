import { z } from "zod";

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title must be less than 100 characters." }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long." })
    .max(500, { message: "Description must be less than 500 characters." }),
  category: z.array(z.string()).optional(),
  coverImage: z.union([
    z
      .instanceof(File, {
        message: "Please upload a cover image.",
      })
      .refine((file) => file.size < 5 * 1024 * 1024, {
        message: "Image must be less than 5MB",
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        {
          message: "Only JPG, PNG, or WEBP images are allowed",
        }
      ),
    z.string().url(),
  ]),

  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long." }),
});
