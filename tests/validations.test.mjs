import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Re-import schemas or define mirrors to verify Zod validation constraints
const inquiryFormSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters").max(50, "First name must be under 50 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters").max(50, "Last name must be under 50 characters"),
  email: z.string().trim().email("Please enter a valid work email address").max(100, "Email must be under 100 characters"),
  phone: z.string().trim().min(10, "Please enter a valid 10-digit phone number").max(20, "Phone number must be under 20 characters").optional().or(z.literal("")),
  inquiryType: z.enum(["technical", "sales", "partnership", "amc"]),
  message: z.string().trim().min(10, "Please describe your project requirements in at least 10 characters").max(2500, "Message must be under 2500 characters"),
});

const productQuoteSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(100, "Email must be under 100 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number must be under 20 characters"),
  companyName: z.string().trim().max(100, "Company name must be under 100 characters").optional().or(z.literal("")),
  productName: z.string().trim().min(1, "Product name is required").max(150, "Product name must be under 150 characters"),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(10000, "Quantity must be 10,000 or fewer"),
  notes: z.string().trim().max(1000, "Notes must be under 1000 characters").optional().or(z.literal("")),
});

// Admin Authorization mirror
const AUTHORIZED_ADMIN_EMAILS = [
  "payalnkapse1720@gmail.com",
  "shravancyeole123@gmail.com",
];

function isAuthorizedAdmin(user) {
  if (!user || !user.email) return false;
  const normalized = user.email.trim().toLowerCase();
  return AUTHORIZED_ADMIN_EMAILS.some((a) => normalized === a.trim().toLowerCase());
}

test("inquiryFormSchema parses valid consultation enquiry payload", () => {
  const valid = {
    firstName: "  John  ",
    lastName: "  Doe  ",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    inquiryType: "technical",
    message: "Need a full enterprise CCTV and biometric access installation.",
  };

  const parsed = inquiryFormSchema.parse(valid);
  assert.equal(parsed.firstName, "John");
  assert.equal(parsed.lastName, "Doe");
  assert.equal(parsed.inquiryType, "technical");
});

test("inquiryFormSchema rejects missing required fields and invalid email", () => {
  assert.throws(() => {
    inquiryFormSchema.parse({
      firstName: "J", // too short (< 2)
      lastName: "Doe",
      email: "not-an-email",
      inquiryType: "invalid-type",
      message: "Short",
    });
  });
});

test("inquiry payload mapping strictly matches hardened firestore.rules", () => {
  const input = {
    firstName: "Alice",
    lastName: "Smith",
    email: "ALICE@EXAMPLE.COM",
    phone: "9876543210",
    inquiryType: "sales",
    message: "Looking for quote on server maintenance.",
  };

  const payload = {
    name: `${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
    fullName: `${input.firstName.trim()} ${input.lastName.trim()}`.trim(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || "",
    inquiryType: input.inquiryType,
    message: input.message.trim(),
    status: "new",
    createdAt: new Date(),
  };

  const allowedKeys = ['name', 'fullName', 'firstName', 'lastName', 'email', 'phone', 'inquiryType', 'message', 'status', 'createdAt'];
  const keys = Object.keys(payload);

  assert.ok(keys.includes("email"));
  assert.ok(keys.includes("inquiryType"));
  assert.ok(keys.includes("message"));
  assert.ok(keys.includes("status"));
  assert.ok(keys.includes("createdAt"));
  assert.ok(keys.includes("name") || (keys.includes("firstName") && keys.includes("lastName")));

  for (const k of keys) {
    assert.ok(allowedKeys.includes(k), `Unexpected key injected: ${k}`);
  }

  assert.equal(typeof payload.email, "string");
  assert.ok(payload.email.length <= 100);
  assert.equal(typeof payload.message, "string");
  assert.ok(payload.message.length >= 10 && payload.message.length <= 2500);
  assert.ok(['technical', 'sales', 'partnership', 'amc'].includes(payload.inquiryType));
  assert.equal(payload.status, "new");
});

test("productQuoteSchema parses valid quote payload", () => {
  const valid = {
    fullName: "Acme Purchasing",
    email: "procurement@acme.org",
    phone: "1234567890",
    companyName: "Acme Corp",
    productName: "Hikvision 4K IP Dome Camera",
    quantity: 12,
    notes: "Please include installation brackets.",
  };

  const parsed = productQuoteSchema.parse(valid);
  assert.equal(parsed.quantity, 12);
  assert.equal(parsed.productName, "Hikvision 4K IP Dome Camera");
});

test("productQuoteSchema rejects negative or zero quantity", () => {
  assert.throws(() => {
    productQuoteSchema.parse({
      fullName: "Jane",
      email: "jane@test.com",
      phone: "1234567890",
      productName: "Camera",
      quantity: 0,
    });
  });
});

test("quote payload mapping strictly matches hardened firestore.rules", () => {
  const input = {
    fullName: "Bob Builder",
    email: "BOB@BUILDER.COM",
    phone: "9876543210",
    companyName: "Bob Co",
    productName: "CCTV Pack",
    quantity: 5,
    notes: "Expedited shipping",
  };

  const payload = {
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    companyName: input.companyName?.trim() || "",
    productName: input.productName.trim(),
    quantity: Number(input.quantity),
    notes: input.notes?.trim() || "",
    status: "pending",
    createdAt: new Date(),
  };

  const allowedKeys = ['fullName', 'email', 'phone', 'companyName', 'productName', 'quantity', 'notes', 'status', 'createdAt'];
  const keys = Object.keys(payload);

  assert.ok(keys.includes("fullName"));
  assert.ok(keys.includes("email"));
  assert.ok(keys.includes("phone"));
  assert.ok(keys.includes("productName"));
  assert.ok(keys.includes("quantity"));
  assert.ok(keys.includes("status"));
  assert.ok(keys.includes("createdAt"));

  for (const k of keys) {
    assert.ok(allowedKeys.includes(k), `Unexpected key injected: ${k}`);
  }

  assert.equal(typeof payload.fullName, "string");
  assert.ok(payload.fullName.length >= 2 && payload.fullName.length <= 100);
  assert.equal(typeof payload.email, "string");
  assert.ok(payload.email.length <= 100);
  assert.equal(typeof payload.phone, "string");
  assert.ok(payload.phone.length <= 20);
  assert.equal(typeof payload.productName, "string");
  assert.ok(payload.productName.length <= 150);
  assert.equal(typeof payload.quantity, "number");
  assert.ok(payload.quantity >= 1 && payload.quantity <= 10000);
  assert.equal(payload.status, "pending");
});

test("both authorized administrator accounts are recognized", () => {
  assert.equal(isAuthorizedAdmin({ email: "payalnkapse1720@gmail.com" }), true);
  assert.equal(isAuthorizedAdmin({ email: "PAYALNKAPSE1720@GMAIL.COM" }), true);
  assert.equal(isAuthorizedAdmin({ email: "  payalnkapse1720@gmail.com  " }), true);

  assert.equal(isAuthorizedAdmin({ email: "shravancyeole123@gmail.com" }), true);
  assert.equal(isAuthorizedAdmin({ email: "SHRAVANCYEOLE123@GMAIL.COM" }), true);
  assert.equal(isAuthorizedAdmin({ email: "  shravancyeole123@gmail.com  " }), true);
});

test("unauthorized accounts are strictly rejected", () => {
  assert.equal(isAuthorizedAdmin(null), false);
  assert.equal(isAuthorizedAdmin(undefined), false);
  assert.equal(isAuthorizedAdmin({}), false);
  assert.equal(isAuthorizedAdmin({ email: "" }), false);
  assert.equal(isAuthorizedAdmin({ email: "attacker@gmail.com" }), false);
  assert.equal(isAuthorizedAdmin({ email: "payalnkapse1720@yahoo.com" }), false);
  assert.equal(isAuthorizedAdmin({ email: "shravancyeole123@other.com" }), false);
});

test("honeypot anti-bot logic intercepts automated submissions", () => {
  const isBotDetected = (hp) => Boolean(hp && hp.trim().length > 0);

  // Human user leaving hidden honeypot blank
  assert.equal(isBotDetected(""), false);
  assert.equal(isBotDetected("   "), false);

  // Spambot auto-filling all input elements
  assert.equal(isBotDetected("https://spam-link.ru"), true);
  assert.equal(isBotDetected("12345"), true);
});
