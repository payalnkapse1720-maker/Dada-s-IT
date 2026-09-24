import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import { InquiryFormData, EnquiryRecord, EnquiryStatus } from "@/types";

const ENQUIRIES_COLLECTION = "enquiries";

/**
 * Creates a new public consultation inquiry in Firestore.
 */
export async function createEnquiry(data: InquiryFormData): Promise<string> {
  const payload = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone ? data.phone.trim() : "",
    inquiryType: data.inquiryType,
    message: data.message.trim(),
    status: "new" as EnquiryStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), payload);
  return docRef.id;
}

/**
 * Fetches all enquiries ordered by newest first.
 */
export async function getEnquiries(): Promise<EnquiryRecord[]> {
  const q = query(
    collection(db, ENQUIRIES_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<EnquiryRecord, "id">),
  }));
}

/**
 * Real-time subscription to enquiries ordered by newest first.
 */
export function subscribeEnquiries(
  onUpdate: (enquiries: EnquiryRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, ENQUIRIES_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: EnquiryRecord[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<EnquiryRecord, "id">),
      }));
      onUpdate(records);
    },
    (err) => {
      console.error("Firestore onSnapshot error (enquiries):", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Updates an enquiry's status.
 */
export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<void> {
  const docRef = doc(db, ENQUIRIES_COLLECTION, id);
  await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes an enquiry document by ID.
 */
export async function deleteEnquiry(id: string): Promise<void> {
  const docRef = doc(db, ENQUIRIES_COLLECTION, id);
  await deleteDoc(docRef);
}
