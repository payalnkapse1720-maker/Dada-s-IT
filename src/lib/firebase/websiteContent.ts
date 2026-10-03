import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import {
  HomepageContentDoc,
  ContactContentDoc,
  AboutContentDoc,
} from "@/types";

const WEBSITE_CONTENT_COLLECTION = "websiteContent";

/**
 * Gets homepage content document.
 */
export async function getHomepageContent(): Promise<HomepageContentDoc | null> {
  const docRef = doc(db, WEBSITE_CONTENT_COLLECTION, "homepage");
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data() as HomepageContentDoc;
}

/**
 * Gets contact content document.
 */
export async function getContactContent(): Promise<ContactContentDoc | null> {
  const docRef = doc(db, WEBSITE_CONTENT_COLLECTION, "contact");
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data() as ContactContentDoc;
}

/**
 * Gets about content document.
 */
export async function getAboutContent(): Promise<AboutContentDoc | null> {
  const docRef = doc(db, WEBSITE_CONTENT_COLLECTION, "about");
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data() as AboutContentDoc;
}

/**
 * Sets or updates any website content section document.
 */
export async function setWebsiteContentSection<T extends object>(
  sectionId: "homepage" | "contact" | "about",
  data: T
): Promise<void> {
  const docRef = doc(db, WEBSITE_CONTENT_COLLECTION, sectionId);
  await setDoc(
    docRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Subscribes to changes on a website content section.
 */
export function subscribeWebsiteContentSection<T>(
  sectionId: "homepage" | "contact" | "about",
  onUpdate: (data: T | null) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const docRef = doc(db, WEBSITE_CONTENT_COLLECTION, sectionId);
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as T);
      } else {
        onUpdate(null);
      }
    },
    (err) => {
      console.error(`Firestore onSnapshot error (websiteContent/${sectionId}):`, err);
      if (onError) onError(err);
    }
  );
}
