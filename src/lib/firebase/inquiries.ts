import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firestore";
import type {
  InquiryFormData,
  ProductQuoteFormData,
  InquiryRecord,
  QuoteRecord,
} from "@/types";

/**
 * Sanitizes and submits a customer consultation/inquiry to the Cloud Firestore "inquiries" collection.
 * Conforms to firestore.rules requirements (requires 'email' and 'name').
 */
export async function submitInquiry(
  data: InquiryFormData
): Promise<{ id: string; success: true }> {
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const fullName = `${firstName} ${lastName}`.trim();
  const email = data.email.trim().toLowerCase();
  const phone = data.phone?.trim() || "";
  const inquiryType = data.inquiryType;
  const message = data.message.trim();

  const payload = {
    name: fullName,
    fullName: fullName,
    firstName,
    lastName,
    email,
    phone,
    inquiryType,
    message,
    status: "new",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "inquiries"), payload);
  return { id: docRef.id, success: true };
}

/**
 * Sanitizes and submits a customer product quotation request to the Cloud Firestore "quotes" collection.
 * Conforms to firestore.rules requirements (requires 'fullName' and 'email').
 */
export async function submitProductQuote(
  data: ProductQuoteFormData
): Promise<{ id: string; success: true }> {
  const fullName = data.fullName.trim();
  const email = data.email.trim().toLowerCase();
  const phone = data.phone.trim();
  const companyName = data.companyName?.trim() || "";
  const productName = data.productName.trim();
  const quantity = Number(data.quantity) || 1;
  const notes = data.notes?.trim() || "";

  const payload = {
    fullName,
    email,
    phone,
    companyName,
    productName,
    quantity,
    notes,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "quotes"), payload);
  return { id: docRef.id, success: true };
}

/**
 * Fetches all consultation inquiries from Cloud Firestore for the authorized admin.
 * Protected by firestore.rules (read allowed only for authenticated admin).
 */
export async function getInquiries(
  maxResults: number = 50
): Promise<InquiryRecord[]> {
  const inquiriesRef = collection(db, "inquiries");

  try {
    const q = query(inquiriesRef, orderBy("createdAt", "desc"), limit(maxResults));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapDocToInquiry);
  } catch {
    // Graceful fallback if composite/single field index is still warming up
    const fallbackSnapshot = await getDocs(query(inquiriesRef, limit(maxResults)));
    const items = fallbackSnapshot.docs.map(mapDocToInquiry);
    return items.sort((a, b) => {
      const timeA = getTimestampMs(a.createdAt);
      const timeB = getTimestampMs(b.createdAt);
      return timeB - timeA;
    });
  }
}

/**
 * Fetches all product quotation requests from Cloud Firestore for the authorized admin.
 * Protected by firestore.rules (read allowed only for authenticated admin).
 */
export async function getQuotes(
  maxResults: number = 50
): Promise<QuoteRecord[]> {
  const quotesRef = collection(db, "quotes");

  try {
    const q = query(quotesRef, orderBy("createdAt", "desc"), limit(maxResults));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapDocToQuote);
  } catch {
    // Graceful fallback if composite/single field index is still warming up
    const fallbackSnapshot = await getDocs(query(quotesRef, limit(maxResults)));
    const items = fallbackSnapshot.docs.map(mapDocToQuote);
    return items.sort((a, b) => {
      const timeA = getTimestampMs(a.createdAt);
      const timeB = getTimestampMs(b.createdAt);
      return timeB - timeA;
    });
  }
}

function mapDocToInquiry(doc: QueryDocumentSnapshot<DocumentData>): InquiryRecord {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name || data.fullName || `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Anonymous",
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phone: data.phone || "",
    inquiryType: data.inquiryType || "technical",
    message: data.message || "",
    status: data.status || "new",
    createdAt: data.createdAt,
  };
}

function mapDocToQuote(doc: QueryDocumentSnapshot<DocumentData>): QuoteRecord {
  const data = doc.data();
  return {
    id: doc.id,
    fullName: data.fullName || data.name || "Anonymous",
    email: data.email || "",
    phone: data.phone || "",
    companyName: data.companyName || "",
    productName: data.productName || "General Quote",
    quantity: data.quantity || 1,
    notes: data.notes || "",
    status: data.status || "pending",
    createdAt: data.createdAt,
  };
}

function getTimestampMs(createdAt: unknown): number {
  if (!createdAt) return 0;
  if (typeof createdAt === "object" && createdAt !== null && "toMillis" in createdAt) {
    return (createdAt as { toMillis: () => number }).toMillis();
  }
  if (createdAt instanceof Date) {
    return createdAt.getTime();
  }
  if (typeof createdAt === "string" || typeof createdAt === "number") {
    return new Date(createdAt).getTime() || 0;
  }
  return 0;
}
