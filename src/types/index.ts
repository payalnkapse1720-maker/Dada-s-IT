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

export interface InquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: "technical" | "sales" | "partnership" | "amc";
  message: string;
}

export interface ProductQuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  productName: string;
  quantity: number;
  notes?: string;
}
