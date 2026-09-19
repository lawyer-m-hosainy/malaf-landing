export interface PricingPackage {
  id: 'basic' | 'pro' | 'vip';
  name: string;
  badge: string;
  price: string;
  originalPrice: string;
  recommended?: boolean;
  ctaText: string;
  features: { text: string; included: boolean }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type DesignLayout = 'split' | 'centered' | 'editorial' | 'sidebar' | 'minimal';

export interface DesignPalette {
  /** Page background */
  bg: string;
  /** Cards / raised surfaces */
  surface: string;
  /** Dominant brand color (headers, buttons) */
  primary: string;
  /** Gold / metallic accent */
  accent: string;
  /** Main text color on bg */
  text: string;
  /** Secondary text color on bg */
  muted: string;
}

export interface PortfolioItem {
  id: string;
  designNumber: number;
  /** Style name shown to the visitor, e.g. «الوقار الكلاسيكي» */
  title: string;
  /** One-line character of the style */
  tag: string;
  /** Short label of the visual style, e.g. «كلاسيكي فاخر» */
  themeStyle: string;
  /** Specialty the style suits best */
  specialty: string;
  /** Other specialties it suits */
  suitableFor: string[];
  /** Fictitious office name used inside the mockup (illustrative only) */
  officeName: string;
  heroTagline: string;
  description: string;
  features: string[];
  colorsDescription: string;
  palette: DesignPalette;
  layout: DesignLayout;
  recommendedPackage: 'basic' | 'pro' | 'vip';
  packageLabel: string;
  /** Placeholder domain shown in the mock browser bar */
  demoDomain: string;
}

export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  specialty: string;
  selectedPackage: string;
  selectedDesign?: string;
  hasWebsite: string;
  addons?: string[];
  notes: string;
  createdAt: string;
  source: string;
  userAgent: string;
  /** Ready wa.me link carrying the full request (set on submit) */
  whatsappUrl?: string;
}
