import { z } from "zod";

export const inquiryFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email address"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").optional().or(z.literal("")),
  inquiryType: z.enum(["technical", "sales", "partnership", "amc"], {
    errorMap: () => ({ message: "Please select an inquiry type" }),
  }),
  message: z.string().min(10, "Please describe your project requirements in at least 10 characters"),
});

export const productQuoteSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  companyName: z.string().optional(),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  notes: z.string().optional(),
});
