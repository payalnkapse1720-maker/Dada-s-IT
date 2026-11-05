import { z } from "zod";

export const inquiryFormSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters").max(50, "First name must be under 50 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters").max(50, "Last name must be under 50 characters"),
  email: z.string().trim().email("Please enter a valid work email address").max(100, "Email must be under 100 characters"),
  phone: z.string().trim().min(10, "Please enter a valid 10-digit phone number").max(20, "Phone number must be under 20 characters").optional().or(z.literal("")),
  inquiryType: z.enum(["technical", "sales", "partnership", "amc"], {
    errorMap: () => ({ message: "Please select an inquiry type" }),
  }),
  message: z.string().trim().min(10, "Please describe your project requirements in at least 10 characters").max(2500, "Message must be under 2500 characters"),
});

export const productQuoteSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(100, "Email must be under 100 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number must be under 20 characters"),
  companyName: z.string().trim().max(100, "Company name must be under 100 characters").optional().or(z.literal("")),
  productName: z.string().trim().min(1, "Product name is required").max(150, "Product name must be under 150 characters"),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(10000, "Quantity must be 10,000 or fewer"),
  notes: z.string().trim().max(1000, "Notes must be under 1000 characters").optional().or(z.literal("")),
});
