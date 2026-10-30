export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category: "infrastructure" | "security" | "management" | "digital";
  features: string[];
  benefits: { title: string; description: string; icon: string }[];
  specifications: { label: string; value: string }[];
  sla: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price?: string;
  rating: number;
  inStock: boolean;
  featured?: boolean;
  image: string;
  description: string;
  specs: { [key: string]: string };
  badge?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string;
  industry: string;
  services: string[];
  description: string;
  challenge?: string;
  solution?: string;
  metrics: { label: string; value: string }[];
  image: string;
  tag: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  icon: string;
  headline: string;
  description: string;
  keyBenefits: string[];
  solutionsProvided: string[];
  image: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  badge?: string;
  description: string;
  isCurrent?: boolean;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Cyber Security" | "Networking" | "CCTV" | "Managed IT" | "Automation";
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  image: string;
  tags: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Services" | "Support & AMC" | "Security";
}

// ==========================================
// Cloud Firestore Database Schema & Models
// ==========================================

// 1. Admins Collection
export type AdminRole = "super_admin" | "content_manager";

export interface AdminDoc {
  adminId: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  profileImage: string;
  lastLogin: any;
  createdAt: any;
  updatedAt: any;
}

// 2. Categories Collection
export interface CategoryDoc {
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  isActive: boolean;
  order: number;
  createdAt: any;
  updatedAt: any;
}

// 3. Products Collection
export interface ProductDoc {
  productId: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  mrp: number;
  discount: number;
  currency: string;
  sku: string;
  images: string[];
  thumbnail: string;
  specifications: Record<string, string>;
  features: string[];
  availability: "in_stock" | "out_of_stock" | "on_order";
  stockQuantity: number;
  condition: "new" | "refurbished";
  warranty: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: any;
  updatedAt: any;
}

// 4. Services Collection
export interface ServiceDoc {
  serviceId: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  isActive: boolean;
  order: number;
  createdAt: any;
  updatedAt: any;
}

// 5. Projects Collection
export interface ProjectDoc {
  projectId: string;
  title: string;
  slug: string;
  clientName: string;
  location: string;
  category: string;
  description: string;
  services: string[];
  images: string[];
  technologies: string[];
  year: string;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: any;
  updatedAt: any;
}

// 6. Enquiries Collection
export type EnquiryType =
  | "product"
  | "service"
  | "general"
  | "technical"
  | "sales"
  | "partnership"
  | "amc";

export type EnquiryStatus =
  | "new"
  | "pending"
  | "contacted"
  | "in-progress"
  | "in_progress"
  | "converted"
  | "resolved"
  | "closed";

export interface EnquiryDoc {
  enquiryId: string;
  id: string;
  name: string;
  email: string;
  mobile: string;
  company: string;
  type: EnquiryType;
  productId: string;
  productName: string;
  serviceId: string;
  serviceName: string;
  message: string;
  status: EnquiryStatus;
  source: string;
  createdAt: any;
  updatedAt: any;
  // Legacy / Form compatibility fields
  firstName?: string;
  lastName?: string;
  phone?: string;
  inquiryType?: string;
}

export interface InquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: "technical" | "sales" | "partnership" | "amc";
  message: string;
  company?: string;
  type?: EnquiryType;
  productId?: string;
  productName?: string;
  serviceId?: string;
  serviceName?: string;
}

export type EnquiryRecord = EnquiryDoc;

// 7. Quotes Collection
export type QuoteStatus =
  | "new"
  | "pending"
  | "contacted"
  | "quoted"
  | "accepted"
  | "rejected"
  | "closed";

export interface QuoteDoc {
  quoteId: string;
  id: string;
  name: string;
  email: string;
  mobile: string;
  company: string;
  productId: string;
  productName: string;
  quantity: number;
  message: string;
  status: QuoteStatus;
  source: string;
  createdAt: any;
  updatedAt: any;
  // Legacy / Form compatibility fields
  fullName?: string;
  phone?: string;
  companyName?: string;
  notes?: string;
}

export interface ProductQuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  productName: string;
  quantity: number;
  notes?: string;
  productId?: string;
  company?: string;
  mobile?: string;
  message?: string;
}

export type QuoteRecord = QuoteDoc;

// 8. Website Content Collection
export interface HomepageContentDoc {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  ctaText: string;
  ctaLink: string;
  updatedAt: any;
}

export interface ContactContentDoc {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  updatedAt: any;
}

export interface AboutContentDoc {
  title: string;
  description: string;
  image: string;
  updatedAt: any;
}
