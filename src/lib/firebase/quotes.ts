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
import { ProductQuoteFormData, QuoteRecord, QuoteStatus } from "@/types";

const QUOTES_COLLECTION = "quotes";

/**
 * Creates a new quotation request in Firestore.
 */
export async function createQuote(data: ProductQuoteFormData): Promise<string> {
  const payload = {
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    companyName: data.companyName ? data.companyName.trim() : "",
    productName: data.productName.trim(),
    quantity: Number(data.quantity) || 1,
    notes: data.notes ? data.notes.trim() : "",
    status: "new" as QuoteStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, QUOTES_COLLECTION), payload);
  return docRef.id;
}

/**
 * Fetches all product quotation requests ordered by newest first.
 */
export async function getQuotes(): Promise<QuoteRecord[]> {
  const q = query(
    collection(db, QUOTES_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<QuoteRecord, "id">),
  }));
}

/**
 * Real-time subscription to quotation requests ordered by newest first.
 */
export function subscribeQuotes(
  onUpdate: (quotes: QuoteRecord[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, QUOTES_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: QuoteRecord[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<QuoteRecord, "id">),
      }));
      onUpdate(records);
    },
    (err) => {
      console.error("Firestore onSnapshot error (quotes):", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Updates a quotation's status.
 */
export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus
): Promise<void> {
  const docRef = doc(db, QUOTES_COLLECTION, id);
  await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a quote document by ID.
 */
export async function deleteQuote(id: string): Promise<void> {
  const docRef = doc(db, QUOTES_COLLECTION, id);
  await deleteDoc(docRef);
}
