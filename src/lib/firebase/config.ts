import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";

/**
 * Firebase Web App configuration loaded from environment variables (.env.local).
 * Never hard-code sensitive or project-specific keys directly in source code.
 */
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dada-s-it-service",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Returns the existing FirebaseApp instance if already initialized,
 * or initializes a new one with the modular Firebase API.
 * Safely handles Next.js Hot Module Replacement (HMR) and SSR.
 */
export function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

// Export reusable singleton Firebase App instance
export const app: FirebaseApp = getFirebaseApp();

export default app;
