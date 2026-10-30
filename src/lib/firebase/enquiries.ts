import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import { InquiryFormData, EnquiryDoc, EnquiryStatus } from "@/types";

const ENQUIRIES_COLLECTION = "enquiries";

/**
 * Creates a new customer inquiry in Firestore.
 */
export async function createEnquiry(
  data: InquiryFormData | Partial<EnquiryDoc>
): Promise<string> {
  const firstName = data.firstName ? data.firstName.trim() : "";
  const lastName = data.lastName ? data.lastName.trim() : "";
  const composedName = [firstName, lastName].filter(Boolean).join(" ");
  const directName = (data as Partial<EnquiryDoc>).name?.trim() || "";
  const finalName = directName || composedName || "Website Visitor";

  const email = data.email ? data.email.trim().toLowerCase() : "";
  const phone = (data.phone || (data as Partial<EnquiryDoc>).mobile || "").trim();
  const company = (data.company || "").trim();
  const type =
    (data as Partial<EnquiryDoc>).type ||
    data.inquiryType ||
    "general";
  const message = (data.message || "").trim();
  const productId = (data as Partial<EnquiryDoc>).productId || "";
  const productName = (data as Partial<EnquiryDoc>).productName || "";
  const serviceId = (data as Partial<EnquiryDoc>).serviceId || "";
  const serviceName = (data as Partial<EnquiryDoc>).serviceName || "";

  const payload = {
    name: finalName,
    firstName: firstName || finalName.split(" ")[0] || "",
    lastName: lastName || finalName.split(" ").slice(1).join(" ") || "",
    email,
    mobile: phone,
    phone,
    company,
    type,
    inquiryType: type,
    productId,
    productName,
    serviceId,
    serviceName,
    message,
    status: "new" as EnquiryStatus,
    source: "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = doc(collection(db, ENQUIRIES_COLLECTION));
  await setDoc(docRef, {
    ...payload,
    enquiryId: docRef.id,
    id: docRef.id,
  });

  return docRef.id;
}

/**
 * Sets a specific enquiry document (for seeding/demo).
 */
export async function setEnquiry(
  enquiryId: string,
  data: Omit<EnquiryDoc, "enquiryId" | "createdAt" | "updatedAt">
): Promise<void> {
  const docRef = doc(db, ENQUIRIES_COLLECTION, enquiryId);
  const firstName = data.firstName || data.name.split(" ")[0] || "";
  const lastName = data.lastName || data.name.split(" ").slice(1).join(" ") || "";
  const payload = {
    enquiryId,
    id: enquiryId,
    name: data.name.trim(),
    firstName,
    lastName,
    email: data.email.trim().toLowerCase(),
    mobile: data.mobile || data.phone || "",
    phone: data.mobile || data.phone || "",
    company: data.company || "",
    type: data.type || "general",
    inquiryType: data.type || "general",
    productId: data.productId || "",
    productName: data.productName || "",
    serviceId: data.serviceId || "",
    serviceName: data.serviceName || "",
    message: data.message.trim(),
    status: data.status || "new",
    source: data.source || "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Fetches all enquiries ordered by newest first.
 */
export async function getEnquiries(): Promise<EnquiryDoc[]> {
  const q = query(
    collection(db, ENQUIRIES_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    enquiryId: docSnap.id,
    id: docSnap.id,
    ...(docSnap.data() as Omit<EnquiryDoc, "enquiryId" | "id">),
  }));
}

/**
 * Fetches single enquiry by ID.
 */
export async function getEnquiryById(enquiryId: string): Promise<EnquiryDoc | null> {
  const docRef = doc(db, ENQUIRIES_COLLECTION, enquiryId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return {
    enquiryId: snap.id,
    id: snap.id,
    ...(snap.data() as Omit<EnquiryDoc, "enquiryId" | "id">),
  };
}

/**
 * Real-time subscription to enquiries ordered by newest first.
 */
export function subscribeEnquiries(
  onUpdate: (enquiries: EnquiryDoc[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, ENQUIRIES_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: EnquiryDoc[] = snapshot.docs.map((docSnap) => ({
        enquiryId: docSnap.id,
        id: docSnap.id,
        ...(docSnap.data() as Omit<EnquiryDoc, "enquiryId" | "id">),
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
