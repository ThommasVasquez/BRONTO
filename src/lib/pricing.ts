import { Product } from "@/types/catalog";
import { QuoteItem } from "@/types/quote";
import { catalogProducts } from "@/data/catalogData";

/**
 * Formatea un valor numérico a pesos colombianos (COP) estándar de forma 100% determinista
 * Evita cualquier discrepancia de hidratación (Hydration Mismatch) entre Node.js SSR y navegadores
 * Ej: 440000 -> "$ 440.000 COP"
 */
export function formatCOP(amount: number, showCurrency: boolean = true): string {
  if (isNaN(amount) || amount === 0) return showCurrency ? "$ 0 COP" : "$ 0";
  const numStr = Math.round(amount).toString();
  const withDots = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return showCurrency ? `$ ${withDots} COP` : `$ ${withDots}`;
}

/**
 * Convierte el string de duración a unidades base (días o meses)
 */
export function parseDurationUnits(durationStr?: string): { days: number; months: number; isDays: boolean } {
  if (!durationStr) return { days: 30, months: 1, isDays: false };

  const str = durationStr.toLowerCase();
  if (str.includes("día") || str.includes("dia")) {
    const num = parseInt(str.replace(/\D/g, ""), 10) || 1;
    return { days: num, months: num / 30, isDays: true };
  }

  if (str.includes("semana")) {
    const num = parseInt(str.replace(/\D/g, ""), 10) || 1;
    return { days: num * 7, months: (num * 7) / 30, isDays: true };
  }

  if (str.includes("mes")) {
    const num = parseInt(str.replace(/\D/g, ""), 10) || 1;
    return { days: num * 30, months: num, isDays: false };
  }

  return { days: 30, months: 1, isDays: false };
}

/**
 * Calcula el subtotal estimado de un ítem en la cotización
 * Reconcilia automáticamente con el catálogo si el ítem proviene de un localStorage previo sin pricing
 */
export function calculateItemTotal(
  item: QuoteItem,
  globalRequiresOperator: boolean = false
): {
  unitPrice: number;
  equipmentSubtotal: number;
  operatorSubtotal: number;
  itemTotal: number;
  priceBasis: string;
} {
  const rawProduct = item.product;
  const product = catalogProducts.find((p) => p.id === rawProduct?.id) || rawProduct;

  if (!product) {
    return {
      unitPrice: 0,
      equipmentSubtotal: 0,
      operatorSubtotal: 0,
      itemTotal: 0,
      priceBasis: "unidad",
    };
  }

  const pricing = product.pricing || {
    basePrice: 0,
    currency: "COP",
    priceUnit: "unidad",
  };

  const quantity = Math.max(1, item.quantity || 1);
  const { days, months, isDays } = parseDurationUnits(item.estimatedDuration);

  let equipmentSubtotal = 0;
  let unitPrice = pricing.basePrice || 0;
  let priceBasis = pricing.priceUnit || "unidad";

  if (product.modality === "alquiler") {
    if (isDays && pricing.dailyRate) {
      unitPrice = pricing.dailyRate;
      priceBasis = "día";
      equipmentSubtotal = pricing.dailyRate * days * quantity;
    } else if (pricing.monthlyRate) {
      unitPrice = pricing.monthlyRate;
      priceBasis = "mes";
      equipmentSubtotal = pricing.monthlyRate * Math.max(1, Math.round(months)) * quantity;
    } else {
      equipmentSubtotal = (pricing.basePrice || 0) * quantity;
    }
  } else {
    // Suministro (concretos, casetones, juntas, etc.)
    equipmentSubtotal = (pricing.basePrice || 0) * quantity;
  }

  // Operador
  let operatorSubtotal = 0;
  if (globalRequiresOperator && pricing.operatorDayRate && product.modality === "alquiler") {
    const totalDays = isDays ? days : months * 26; // 26 días laborales por mes
    operatorSubtotal = pricing.operatorDayRate * totalDays * quantity;
  }

  return {
    unitPrice,
    equipmentSubtotal,
    operatorSubtotal,
    itemTotal: equipmentSubtotal + operatorSubtotal,
    priceBasis,
  };
}

/**
 * Tabla de fletes y transporte estimado según zona de Bogotá y Sabana (con +10% aplicado)
 */
export const transportRatesByZone: Record<string, number> = {
  "Bogotá D.C.": 385000,
  "Cota / Siberia": 440000,
  "Chía": 495000,
  "Mosquera": 495000,
  "Funza": 495000,
  "Madrid": 550000,
  "Facatativá": 660000,
  "Soacha": 495000,
  "Zipaquirá": 605000,
  "Tocancipá": 605000,
  "Sopó": 605000,
  "Tenjo": 550000,
  "Subachoque": 660000,
  "Otro municipio": 660000,
};

/**
 * Resumen financiero total de la cotización
 */
export interface QuoteFinancialSummary {
  equipmentTotal: number;
  operatorTotal: number;
  transportTotal: number;
  subtotalBeforeTax: number;
  taxAmount: number; // IVA 19%
  grandTotal: number;
  discountAmount: number;
  itemBreakdown: {
    productId: string;
    productName: string;
    quantity: number;
    duration: string;
    unitPrice: number;
    priceBasis: string;
    subtotal: number;
  }[];
}

export function computeQuoteSummary(
  items: QuoteItem[],
  requiresOperator: boolean,
  requiresTransport: boolean,
  city: string = "Bogotá D.C."
): QuoteFinancialSummary {
  let equipmentTotal = 0;
  let operatorTotal = 0;

  const itemBreakdown = items.map((item) => {
    const res = calculateItemTotal(item, requiresOperator);
    equipmentTotal += res.equipmentSubtotal;
    operatorTotal += res.operatorSubtotal;

    return {
      productId: item.product?.id || "",
      productName: item.product?.name || "Equipo",
      quantity: item.quantity || 1,
      duration: item.estimatedDuration || "1 mes",
      unitPrice: res.unitPrice,
      priceBasis: res.priceBasis,
      subtotal: res.itemTotal,
    };
  });

  const transportTotal = requiresTransport ? (transportRatesByZone[city] || 440000) : 0;

  // Descuento por volumen en cotizaciones grandes (> $10.000.000)
  let discountAmount = 0;
  if (equipmentTotal > 15000000) {
    discountAmount = Math.round(equipmentTotal * 0.05); // 5% descuento corporativo
  }

  const subtotalBeforeTax = equipmentTotal + operatorTotal + transportTotal - discountAmount;
  const taxAmount = Math.round(subtotalBeforeTax * 0.19); // IVA 19%
  const grandTotal = subtotalBeforeTax + taxAmount;

  return {
    equipmentTotal,
    operatorTotal,
    transportTotal,
    subtotalBeforeTax,
    taxAmount,
    grandTotal,
    discountAmount,
    itemBreakdown,
  };
}

