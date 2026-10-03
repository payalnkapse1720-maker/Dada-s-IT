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
import { ServiceDoc } from "@/types";

const SERVICES_COLLECTION = "services";

/**
 * Fetches all services ordered by index.
 */
export async function getServices(): Promise<ServiceDoc[]> {
  const q = query(
    collection(db, SERVICES_COLLECTION),
    orderBy("order", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    serviceId: docSnap.id,
    ...(docSnap.data() as Omit<ServiceDoc, "serviceId">),
  }));
}

/**
 * Real-time subscription to services.
 */
export function subscribeServices(
  onUpdate: (services: ServiceDoc[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, SERVICES_COLLECTION),
    orderBy("order", "asc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: ServiceDoc[] = snapshot.docs.map((docSnap) => ({
        serviceId: docSnap.id,
        ...(docSnap.data() as Omit<ServiceDoc, "serviceId">),
      }));
      onUpdate(records);
    },
    (err) => {
      console.error("Firestore onSnapshot error (services):", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Fetches service by document ID.
 */
export async function getServiceById(serviceId: string): Promise<ServiceDoc | null> {
  const docRef = doc(db, SERVICES_COLLECTION, serviceId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return {
    serviceId: snap.id,
    ...(snap.data() as Omit<ServiceDoc, "serviceId">),
  };
}

/**
 * Fetches service by slug.
 */
export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  const q = query(
    collection(db, SERVICES_COLLECTION),
    where("slug", "==", slug.trim().toLowerCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const firstDoc = snap.docs[0];
  return {
    serviceId: firstDoc.id,
    ...(firstDoc.data() as Omit<ServiceDoc, "serviceId">),
  };
}

/**
 * Sets or updates a service with deterministic ID (e.g. srv_001).
 */
export async function setService(
  serviceId: string,
  data: Omit<ServiceDoc, "serviceId" | "createdAt" | "updatedAt">
): Promise<void> {
  const docRef = doc(db, SERVICES_COLLECTION, serviceId);
  const payload = {
    serviceId,
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    description: data.description || "",
    icon: data.icon || "laptop",
    image: data.image || "",
    isActive: data.isActive ?? true,
    order: Number(data.order) || 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Creates a new service.
 */
export async function createService(
  data: Omit<ServiceDoc, "serviceId" | "createdAt" | "updatedAt"> & { customId?: string }
): Promise<string> {
  if (data.customId) {
    await setService(data.customId, data);
    return data.customId;
  }

  const payload = {
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    description: data.description || "",
    icon: data.icon || "laptop",
    image: data.image || "",
    isActive: data.isActive ?? true,
    order: Number(data.order) || 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, SERVICES_COLLECTION), payload);
  await updateDoc(docRef, { serviceId: docRef.id });
  return docRef.id;
}

/**
 * Updates an existing service.
 */
export async function updateService(
  serviceId: string,
  data: Partial<Omit<ServiceDoc, "serviceId" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, SERVICES_COLLECTION, serviceId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a service document.
 */
export async function deleteService(serviceId: string): Promise<void> {
  const docRef = doc(db, SERVICES_COLLECTION, serviceId);
  await deleteDoc(docRef);
}
