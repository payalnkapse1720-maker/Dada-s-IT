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
import { ProductDoc } from "@/types";

const PRODUCTS_COLLECTION = "products";

/**
 * Fetches all products.
 */
export async function getProducts(options?: {
  categoryId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}): Promise<ProductDoc[]> {
  let q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  if (options?.categoryId) {
    q = query(q, where("categoryId", "==", options.categoryId));
  }
  if (options?.isActive !== undefined) {
    q = query(q, where("isActive", "==", options.isActive));
  }
  if (options?.isFeatured !== undefined) {
    q = query(q, where("isFeatured", "==", options.isFeatured));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    productId: docSnap.id,
    ...(docSnap.data() as Omit<ProductDoc, "productId">),
  }));
}

/**
 * Real-time subscription to products.
 */
export function subscribeProducts(
  onUpdate: (products: ProductDoc[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const records: ProductDoc[] = snapshot.docs.map((docSnap) => ({
        productId: docSnap.id,
        ...(docSnap.data() as Omit<ProductDoc, "productId">),
      }));
      onUpdate(records);
    },
    (err) => {
      console.error("Firestore onSnapshot error (products):", err);
      if (onError) onError(err);
    }
  );
}

/**
 * Fetches product by ID.
 */
export async function getProductById(productId: string): Promise<ProductDoc | null> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return {
    productId: snap.id,
    ...(snap.data() as Omit<ProductDoc, "productId">),
  };
}

/**
 * Fetches product by slug.
 */
export async function getProductBySlug(slug: string): Promise<ProductDoc | null> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("slug", "==", slug.trim().toLowerCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const firstDoc = snap.docs[0];
  return {
    productId: firstDoc.id,
    ...(firstDoc.data() as Omit<ProductDoc, "productId">),
  };
}

/**
 * Sets product with specific document ID (e.g. product_001).
 */
export async function setProduct(
  productId: string,
  data: Omit<ProductDoc, "productId" | "createdAt" | "updatedAt">
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  const payload = {
    productId,
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    categoryId: data.categoryId || "cat_001",
    categoryName: data.categoryName || "Computers & Laptops",
    brand: data.brand || "",
    description: data.description || "",
    shortDescription: data.shortDescription || "",
    price: Number(data.price) || 0,
    mrp: Number(data.mrp) || 0,
    discount: Number(data.discount) || 0,
    currency: data.currency || "INR",
    sku: data.sku || "",
    images: Array.isArray(data.images) ? data.images : [],
    thumbnail: data.thumbnail || (Array.isArray(data.images) && data.images[0]) || "",
    specifications: data.specifications || {},
    features: Array.isArray(data.features) ? data.features : [],
    availability: data.availability || "in_stock",
    stockQuantity: Number(data.stockQuantity) || 0,
    condition: data.condition || "new",
    warranty: data.warranty || "",
    isFeatured: Boolean(data.isFeatured),
    isActive: data.isActive ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(docRef, payload, { merge: true });
}

/**
 * Creates a new product.
 */
export async function createProduct(
  data: Omit<ProductDoc, "productId" | "createdAt" | "updatedAt"> & { customId?: string }
): Promise<string> {
  if (data.customId) {
    await setProduct(data.customId, data);
    return data.customId;
  }

  const payload = {
    name: data.name.trim(),
    slug: data.slug.trim().toLowerCase(),
    categoryId: data.categoryId || "cat_001",
    categoryName: data.categoryName || "Computers & Laptops",
    brand: data.brand || "",
    description: data.description || "",
    shortDescription: data.shortDescription || "",
    price: Number(data.price) || 0,
    mrp: Number(data.mrp) || 0,
    discount: Number(data.discount) || 0,
    currency: data.currency || "INR",
    sku: data.sku || "",
    images: Array.isArray(data.images) ? data.images : [],
    thumbnail: data.thumbnail || (Array.isArray(data.images) && data.images[0]) || "",
    specifications: data.specifications || {},
    features: Array.isArray(data.features) ? data.features : [],
    availability: data.availability || "in_stock",
    stockQuantity: Number(data.stockQuantity) || 0,
    condition: data.condition || "new",
    warranty: data.warranty || "",
    isFeatured: Boolean(data.isFeatured),
    isActive: data.isActive ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), payload);
  await updateDoc(docRef, { productId: docRef.id });
  return docRef.id;
}

/**
 * Updates an existing product.
 */
export async function updateProduct(
  productId: string,
  data: Partial<Omit<ProductDoc, "productId" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Deletes a product document.
 */
export async function deleteProduct(productId: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  await deleteDoc(docRef);
}
