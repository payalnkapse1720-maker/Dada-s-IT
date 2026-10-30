import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import { AdminDoc, AdminRole } from "@/types";

const ADMINS_COLLECTION = "admins";

/**
 * Fetches all administrators.
 * Sensitive password credentials are NOT stored in Firestore.
 */
export async function getAdmins(): Promise<AdminDoc[]> {
  const q = query(
    collection(db, ADMINS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    adminId: docSnap.id,
    ...(docSnap.data() as Omit<AdminDoc, "adminId">),
  }));
}

/**
 * Real-time subscription to administrators list.
 */
export function subscribeAdmins(
  onUpdate: (admins: AdminDoc[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, ADMINS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: AdminDoc[] = snapshot.docs.map((docSnap) => ({
        adminId: docSnap.id,
        ...(docSnap.data() as Omit<AdminDoc, "adminId">),
      }));
      onUpdate(records);
    },
    (err) => {
      console.error("Firestore onSnapshot error (admins):", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Fetches an admin profile by their document ID.
 */
export async function getAdminById(adminId: string): Promise<AdminDoc | null> {
  const docRef = doc(db, ADMINS_COLLECTION, adminId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return {
    adminId: snap.id,
    ...(snap.data() as Omit<AdminDoc, "adminId">),
  };
}

/**
 * Looks up an admin by their authentication email.
 */
export async function getAdminByEmail(email: string): Promise<AdminDoc | null> {
  const q = query(
    collection(db, ADMINS_COLLECTION),
    where("email", "==", email.trim().toLowerCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const firstDoc = snap.docs[0];
  return {
    adminId: firstDoc.id,
    ...(firstDoc.data() as Omit<AdminDoc, "adminId">),
  };
}

/**
 * Creates or sets an admin document.
 * SECURITY: NEVER store password in Firestore.
 */
export async function setAdmin(
  adminId: string,
  data: {
    name: string;
    email: string;
    role: AdminRole;
    isActive?: boolean;
    profileImage?: string;
  }
): Promise<void> {
  const docRef = doc(db, ADMINS_COLLECTION, adminId);
  const payload = {
    adminId,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    role: data.role,
    isActive: data.isActive ?? true,
    profileImage: data.profileImage || "",
    lastLogin: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Updates an admin document.
 */
export async function updateAdmin(
  adminId: string,
  data: Partial<Omit<AdminDoc, "adminId" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, ADMINS_COLLECTION, adminId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Records an admin login timestamp.
 */
export async function updateAdminLastLogin(adminId: string): Promise<void> {
  const docRef = doc(db, ADMINS_COLLECTION, adminId);
  await updateDoc(docRef, {
    lastLogin: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes an admin document.
 */
export async function deleteAdmin(adminId: string): Promise<void> {
  const docRef = doc(db, ADMINS_COLLECTION, adminId);
  await deleteDoc(docRef);
}
