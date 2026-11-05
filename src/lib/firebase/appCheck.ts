import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from "firebase/app-check";
import { app } from "./config";

let appCheckInstance: AppCheck | null = null;

/**
 * Initializes and returns the Firebase App Check instance.
 * Safe for Next.js SSR, HMR, and environments where App Check site key is not yet configured.
 *
 * Requirements:
 * - Requires a public reCAPTCHA v3 site key in NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY or NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
 * - In development mode, automatically enables self.FIREBASE_APPCHECK_DEBUG_TOKEN.
 * - Does not throw or break the application if the site key is absent.
 */
export function initAppCheck(): AppCheck | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (appCheckInstance) {
    return appCheckInstance;
  }

  const siteKey =
    process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY ||
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return null;
  }

  try {
    if (process.env.NODE_ENV !== "production") {
      const debugToken = process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN;
      (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string }).FIREBASE_APPCHECK_DEBUG_TOKEN =
        debugToken || true;
    }

    appCheckInstance = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });

    return appCheckInstance;
  } catch {
    return null;
  }
}

// Auto-initialize App Check safely in client environments
if (typeof window !== "undefined") {
  initAppCheck();
}

export default initAppCheck;
