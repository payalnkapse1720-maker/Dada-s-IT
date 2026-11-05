import { getFirestore, type Firestore } from "firebase/firestore";
import { app } from "./config";

let firestoreInstance: Firestore | null = null;

/**
 * Returns the Cloud Firestore instance.
 * Initializes the Firestore service with the current Firebase App if not already cached.
 */
export function getFirebaseFirestore(): Firestore {
  if (!firestoreInstance) {
    firestoreInstance = getFirestore(app);
  }
  return firestoreInstance;
}

// Reusable singleton Cloud Firestore instances
export const db: Firestore = getFirebaseFirestore();
export const firestore: Firestore = db;

export default db;
