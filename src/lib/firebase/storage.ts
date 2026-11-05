import { getStorage, type FirebaseStorage } from "firebase/storage";
import { app } from "./config";

let storageInstance: FirebaseStorage | null = null;

/**
 * Returns the Firebase Storage instance.
 * Initializes the Storage service with the current Firebase App if not already cached.
 */
export function getFirebaseStorage(): FirebaseStorage {
  if (!storageInstance) {
    storageInstance = getStorage(app);
  }
  return storageInstance;
}

// Reusable singleton Firebase Storage instance
export const storage: FirebaseStorage = getFirebaseStorage();

export default storage;
