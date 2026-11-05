export type ModalityType = "alquiler" | "suministro" | "servicio" | "alquiler_suministro";

export type CategoryId = 
  | "maquinaria-equipos"
  | "formaletas-sistemas"
  | "concretos-estructuras"
  | "icopores-modulados";

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  iconName: string;
  subcategories: string[];
}

export interface TechnicalSpec {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ProductPricing {
  basePrice: number; // Precio base en COP con 10% de referencia aplicado
  currency: "COP";
  priceUnit: "día" | "mes" | "m² / mes" | "m³" | "unidad" | "metro lineal" | "m²";
  dailyRate?: number; // Tarifa día en COP
  monthlyRate?: number; // Tarifa mes en COP
  operatorDayRate?: number; // Tarifa día operador calificado en COP
  discountNotice?: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  commercialName: string;
  categoryId: CategoryId;
  subcategory: string;
  modality: ModalityType;
  shortDescription: string;
  fullDescription: string;
  images: {
    url: string;
    alt: string;
    isPrimary?: boolean;
  }[];
  specifications: TechnicalSpec[];
  features: string[];
  unit: string; // ej: "Día / Mes", "m² / Mes", "m³", "Unidad"
  pricing: ProductPricing;
  priceNote: string; // Nota descriptiva comercial
  availabilityStatus: "disponible_inmediato" | "bajo_reserva" | "consultar_zona";
  availabilityLabel: string;
  rentalConditions?: string[];
  supplyConditions?: string[];
  serviceConditions?: string[];
  datasheetUrl?: string; // Ficha técnica descargable
  featured: boolean;
  relatedSlugs: string[];
  tags: string[];
}

export interface CatalogFilterState {
  searchQuery: string;
  categoryId: string;
  subcategory: string;
  modality: string;
  availability: string;
  sortBy: "featured" | "name_asc" | "name_desc" | "price_asc" | "price_desc";
}

