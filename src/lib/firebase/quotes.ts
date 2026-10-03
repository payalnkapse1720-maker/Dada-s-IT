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
import { ProductQuoteFormData, QuoteDoc, QuoteStatus } from "@/types";

const QUOTES_COLLECTION = "quotes";

/**
 * Creates a new quotation request in Firestore.
 */
export async function createQuote(
  data: ProductQuoteFormData | Partial<QuoteDoc>
): Promise<string> {
  const name = (data.fullName || (data as Partial<QuoteDoc>).name || "").trim();
  const email = (data.email || "").trim().toLowerCase();
  const phone = (data.phone || (data as Partial<QuoteDoc>).mobile || "").trim();
  const company = (data.companyName || (data as Partial<QuoteDoc>).company || "").trim();
  const productName = (data.productName || "").trim();
  const productId = (data as Partial<QuoteDoc>).productId || "";
  const quantity = Number(data.quantity) || 1;
  const message = (data.notes || (data as Partial<QuoteDoc>).message || "").trim();

  const payload = {
    name: name || "Customer",
    fullName: name || "Customer",
    email,
    mobile: phone,
    phone,
    company,
    companyName: company,
    productId,
    productName,
    quantity,
    message,
    notes: message,
    status: "pending" as QuoteStatus,
    source: "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = doc(collection(db, QUOTES_COLLECTION));
  await setDoc(docRef, {
    ...payload,
    quoteId: docRef.id,
    id: docRef.id,
  });

  return docRef.id;
}

/**
 * Sets a quote document (used for seeding/demo).
 */
export async function setQuote(
  quoteId: string,
  data: Omit<QuoteDoc, "quoteId" | "createdAt" | "updatedAt">
): Promise<void> {
  const docRef = doc(db, QUOTES_COLLECTION, quoteId);
  const name = data.name.trim();
  const company = data.company || "";
  const phone = data.mobile || data.phone || "";
  const message = data.message || data.notes || "";

  const payload = {
    quoteId,
    id: quoteId,
    name,
    fullName: name,
    email: data.email.trim().toLowerCase(),
    mobile: phone,
    phone,
    company,
    companyName: company,
    productId: data.productId || "",
    productName: data.productName || "",
    quantity: Number(data.quantity) || 1,
    message,
    notes: message,
    status: data.status || "pending",
    source: data.source || "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Fetches all product quotation requests ordered by newest first.
 */
export async function getQuotes(): Promise<QuoteDoc[]> {
  const q = query(
    collection(db, QUOTES_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({
    quoteId: docSnap.id,
    id: docSnap.id,
    ...(docSnap.data() as Omit<QuoteDoc, "quoteId" | "id">),
  }));
}

/**
 * Fetches quote by document ID.
 */
export async function getQuoteById(quoteId: string): Promise<QuoteDoc | null> {
  const docRef = doc(db, QUOTES_COLLECTION, quoteId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return {
    quoteId: snap.id,
    id: snap.id,
    ...(snap.data() as Omit<QuoteDoc, "quoteId" | "id">),
  };
}

/**
 * Real-time subscription to quotation requests ordered by newest first.
 */
export function subscribeQuotes(
  onUpdate: (quotes: QuoteDoc[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, QUOTES_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: QuoteDoc[] = snapshot.docs.map((docSnap) => ({
        quoteId: docSnap.id,
        id: docSnap.id,
        ...(docSnap.data() as Omit<QuoteDoc, "quoteId" | "id">),
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
