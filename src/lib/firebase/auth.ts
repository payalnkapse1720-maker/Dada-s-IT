import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
  type UserCredential,
  type Unsubscribe,
} from "firebase/auth";
import { app } from "./config";

let authInstance: Auth | null = null;

/**
 * Returns the Firebase Authentication instance.
 * Initializes the Auth service with the current Firebase App if not already cached.
 */
export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    authInstance = getAuth(app);
  }
  return authInstance;
}

/**
 * Reusable singleton Firebase Authentication instance.
 * Safe against initial missing API keys in .env.local during local setup / build.
 */
export const auth: Auth = (() => {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return getFirebaseAuth();
    }
    return getFirebaseAuth();
  } catch {
    return new Proxy({} as Auth, {
      get(_target, prop) {
        try {
          const resolved = getFirebaseAuth();
          const val = (resolved as unknown as Record<string | symbol, unknown>)[prop];
          return typeof val === "function" ? val.bind(resolved) : val;
        } catch {
          return undefined;
        }
      },
    });
  }
})();

/**
 * Authenticates a user with email and password via Firebase Authentication.
 */
export async function loginWithEmail(email: string, password: string): Promise<UserCredential> {
  const authClient = getFirebaseAuth();
  return signInWithEmailAndPassword(authClient, email, password);
}

/**
 * Signs out the current user and completely clears the Firebase session.
 */
export async function logoutUser(): Promise<void> {
  const authClient = getFirebaseAuth();
  return signOut(authClient);
}

/**
 * Subscribes to Firebase Authentication state changes.
 * Returns an unsubscribe callback for clean component teardown.
 */
export function onAuthChange(callback: (user: User | null) => void): Unsubscribe {
  const authClient = getFirebaseAuth();
  return onAuthStateChanged(authClient, callback);
}

export default auth;
