import { Product, ModalityType } from "./catalog";

export interface QuoteItem {
  product: Product;
  quantity: number;
  modality: ModalityType;
  estimatedDuration?: string; // ej: "15 días", "1 mes", "3 meses"
  estimatedStartDate?: string;
  notes?: string;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  taxId?: string; // NIT opcional
  email: string;
  phone: string;
  city: string;
  deliveryAddress?: string;
  projectType: "edificacion" | "infraestructura" | "industrial" | "remodelacion" | "otro";
  startDate: string;
  estimatedDuration: string;
  observations: string;
  requiresTransport: boolean;
  requiresOperator: boolean;
}

export interface QuoteSubmissionPayload {
  items: QuoteItem[];
  formData: QuoteFormData;
  submittedAt: string;
  quoteReferenceId: string;
}
