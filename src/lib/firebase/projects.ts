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
import { ProjectDoc } from "@/types";

const PROJECTS_COLLECTION = "projects";

/**
 * Fetches all projects.
 */
export async function getProjects(options?: {
  isActive?: boolean;
  isFeatured?: boolean;
}): Promise<ProjectDoc[]> {
  let q = query(
    collection(db, PROJECTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  if (options?.isActive !== undefined) {
    q = query(q, where("isActive", "==", options.isActive));
  }
  if (options?.isFeatured !== undefined) {
    q = query(q, where("isFeatured", "==", options.isFeatured));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    projectId: docSnap.id,
    ...(docSnap.data() as Omit<ProjectDoc, "projectId">),
  }));
}

/**
 * Real-time subscription to projects.
 */
export function subscribeProjects(
  onUpdate: (projects: ProjectDoc[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: ProjectDoc[] = snapshot.docs.map((docSnap) => ({
        projectId: docSnap.id,
        ...(docSnap.data() as Omit<ProjectDoc, "projectId">),
      }));
      onUpdate(records);
    },
    (err) => {
      console.error("Firestore onSnapshot error (projects):", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Fetches project by document ID.
 */
export async function getProjectById(projectId: string): Promise<ProjectDoc | null> {
  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return {
    projectId: snap.id,
    ...(snap.data() as Omit<ProjectDoc, "projectId">),
  };
}

/**
 * Fetches project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectDoc | null> {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    where("slug", "==", slug.trim().toLowerCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const firstDoc = snap.docs[0];
  return {
    projectId: firstDoc.id,
    ...(firstDoc.data() as Omit<ProjectDoc, "projectId">),
  };
}

/**
 * Sets project with deterministic ID (e.g. project_001).
 */
export async function setProject(
  projectId: string,
  data: Omit<ProjectDoc, "projectId" | "createdAt" | "updatedAt">
): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  const payload = {
    projectId,
    title: data.title.trim(),
    slug: data.slug.trim().toLowerCase(),
    clientName: data.clientName || "",
    location: data.location || "",
    category: data.category || "",
    description: data.description || "",
    services: Array.isArray(data.services) ? data.services : [],
    images: Array.isArray(data.images) ? data.images : [],
    technologies: Array.isArray(data.technologies) ? data.technologies : [],
    year: data.year || new Date().getFullYear().toString(),
    isFeatured: Boolean(data.isFeatured),
    isActive: data.isActive ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Creates a new project.
 */
export async function createProject(
  data: Omit<ProjectDoc, "projectId" | "createdAt" | "updatedAt"> & { customId?: string }
): Promise<string> {
  if (data.customId) {
    await setProject(data.customId, data);
    return data.customId;
  }

  const payload = {
    title: data.title.trim(),
    slug: data.slug.trim().toLowerCase(),
    clientName: data.clientName || "",
    location: data.location || "",
    category: data.category || "",
    description: data.description || "",
    services: Array.isArray(data.services) ? data.services : [],
    images: Array.isArray(data.images) ? data.images : [],
    technologies: Array.isArray(data.technologies) ? data.technologies : [],
    year: data.year || new Date().getFullYear().toString(),
    isFeatured: Boolean(data.isFeatured),
    isActive: data.isActive ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), payload);
  await updateDoc(docRef, { projectId: docRef.id });
  return docRef.id;
}

/**
 * Updates an existing project.
 */
export async function updateProject(
  projectId: string,
  data: Partial<Omit<ProjectDoc, "projectId" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a project document.
 */
export async function deleteProject(projectId: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  await deleteDoc(docRef);
}
