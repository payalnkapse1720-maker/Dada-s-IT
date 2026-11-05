import type { User } from "firebase/auth";

/**
 * Centralized list of authorized administrator identities for the DADA'S I.T Admin Panel.
 * Defined strictly in this authorization module and kept consistent with firestore.rules.
 */
export const AUTHORIZED_ADMIN_EMAILS: readonly string[] = [
  "payalnkapse1720@gmail.com",
  "shravancyeole123@gmail.com",
] as const;

/**
 * Primary administrator email maintained for backward compatibility.
 */
export const AUTHORIZED_ADMIN_EMAIL = AUTHORIZED_ADMIN_EMAILS[0];

export interface AuthorizationOptions {
  /**
   * Optional check requiring the Firebase user's email to be verified.
   * Defaults to false so initial setup and email/password accounts can log in seamlessly.
   */
  requireEmailVerified?: boolean;
}

export interface AuthorizationCheckResult {
  isAuthorized: boolean;
  reason: "authorized" | "unauthenticated" | "missing_email" | "unauthorized_email" | "unverified_email";
}

/**
 * Evaluates whether an authenticated Firebase User is authorized as one of the administrators.
 *
 * Security Requirements:
 * 1. Accepts ONLY an authentic Firebase User instance (from Firebase Auth SDK).
 * 2. Never accepts raw email strings from client inputs, URL queries, or browser storage.
 * 3. Normalizes user email (trimmed and lowercased) before comparing against authorized identities.
 * 4. Rejects null/undefined users and users missing an email.
 * 5. Optionally enforces emailVerified check where appropriate.
 */
export function isAuthorizedAdmin(
  user: User | null | undefined,
  options: AuthorizationOptions = {}
): boolean {
  if (!user) {
    return false;
  }

  if (!user.email) {
    return false;
  }

  if (options.requireEmailVerified && !user.emailVerified) {
    return false;
  }

  const normalizedUserEmail = user.email.trim().toLowerCase();

  return AUTHORIZED_ADMIN_EMAILS.some(
    (adminEmail) => normalizedUserEmail === adminEmail.trim().toLowerCase()
  );
}

/**
 * Returns a detailed authorization status for state management and logging.
 */
export function evaluateAdminAuthorization(
  user: User | null | undefined,
  options: AuthorizationOptions = {}
): AuthorizationCheckResult {
  if (!user) {
    return { isAuthorized: false, reason: "unauthenticated" };
  }

  if (!user.email) {
    return { isAuthorized: false, reason: "missing_email" };
  }

  if (options.requireEmailVerified && !user.emailVerified) {
    return { isAuthorized: false, reason: "unverified_email" };
  }

  const normalizedUserEmail = user.email.trim().toLowerCase();

  const isMatched = AUTHORIZED_ADMIN_EMAILS.some(
    (adminEmail) => normalizedUserEmail === adminEmail.trim().toLowerCase()
  );

  if (isMatched) {
    return { isAuthorized: true, reason: "authorized" };
  }

  return { isAuthorized: false, reason: "unauthorized_email" };
}
