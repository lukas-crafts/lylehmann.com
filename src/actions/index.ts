import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        message: "Invalid email address",
      }),
      message: z.string().min(10, "Message must be at least 10 characters"),
    }),
    handler: async (input) => {
      console.log("Contact form submission:", input);

      // Here you would typically send an email or save to a database
      // For now, we'll just simulate a delay and return success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: "Thank you! Your message has been sent.",
      };
    },
  }),
};
