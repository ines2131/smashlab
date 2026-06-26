import z from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
