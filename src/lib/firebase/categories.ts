import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
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
import { CategoryDoc } from "@/types";

const CATEGORIES_COLLECTION = "categories";

/**
 * Fetches all categories ordered by sequence index.
 */
export async function getCategories(): Promise<CategoryDoc[]> {
  const q = query(
    collection(db, CATEGORIES_COLLECTION),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    categoryId: docSnap.id,
    ...(docSnap.data() as Omit<CategoryDoc, "categoryId">),
  }));
}

/**
 * Real-time subscription to product categories.
 */
export function subscribeCategories(
  onUpdate: (categories: CategoryDoc[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, CATEGORIES_COLLECTION),
    orderBy("order", "asc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: CategoryDoc[] = snapshot.docs.map((docSnap) => ({
        categoryId: docSnap.id,
        ...(docSnap.data() as Omit<CategoryDoc, "categoryId">),
      }));
      onUpdate(records);
    },
    (err) => {
      console.error("Firestore onSnapshot error (categories):", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Fetches category by document ID.
 */
export async function getCategoryById(categoryId: string): Promise<CategoryDoc | null> {
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return {
    categoryId: snap.id,
    ...(snap.data() as Omit<CategoryDoc, "categoryId">),
  };
}

/**
 * Fetches category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryDoc | null> {
  const q = query(
    collection(db, CATEGORIES_COLLECTION),
    where("slug", "==", slug.trim().toLowerCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const firstDoc = snap.docs[0];
  return {
    categoryId: firstDoc.id,
    ...(firstDoc.data() as Omit<CategoryDoc, "categoryId">),
  };
}

/**
 * Sets or creates a category with a deterministic ID (e.g. cat_001).
 */
export async function setCategory(
  categoryId: string,
  data: Omit<CategoryDoc, "categoryId" | "createdAt" | "updatedAt">
): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
  const payload = {
    categoryId,
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    description: data.description || "",
    image: data.image || "",
    icon: data.icon || "package",
    isActive: data.isActive ?? true,
    order: Number(data.order) || 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Creates a new category with an auto-generated or custom ID.
 */
export async function createCategory(
  data: Omit<CategoryDoc, "categoryId" | "createdAt" | "updatedAt"> & { customId?: string }
): Promise<string> {
  if (data.customId) {
    await setCategory(data.customId, data);
    return data.customId;
  }

  const payload = {
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    description: data.description || "",
    image: data.image || "",
    icon: data.icon || "package",
    isActive: data.isActive ?? true,
    order: Number(data.order) || 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), payload);
  await updateDoc(docRef, { categoryId: docRef.id });
  return docRef.id;
}

/**
 * Updates an existing category.
 */
export async function updateCategory(
  categoryId: string,
  data: Partial<Omit<CategoryDoc, "categoryId" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a category document.
 */
export async function deleteCategory(categoryId: string): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
  await deleteDoc(docRef);
}
