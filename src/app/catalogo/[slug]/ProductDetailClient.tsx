"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/catalog";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { formatCOP, calculateItemTotal } from "@/lib/pricing";
import { 
  Plus, 
  Minus, 
  Check, 
  ChevronRight, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Calculator,
  Tag
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [estimatedDuration, setEstimatedDuration] = useState("1 mes");
  const [addedSuccess, setAddedSuccess] = useState(false);

  const liveEstimate = calculateItemTotal({
    product,
    quantity,
    modality: product.modality,
    estimatedDuration,
  });

  const { addItem, isInBasket } = useQuoteBasket();
  const router = useRouter();

  const handleAddToQuote = () => {
    addItem(product, quantity, product.modality, estimatedDuration);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleQuoteDirectly = () => {
    addItem(product, quantity, product.modality, estimatedDuration);
    router.push("/cotizar");
  };

  return (
    <div className="lg:col-span-7 space-y-8">
      {/* Galería de Fotografías de Gran Formato */}
      <div className="space-y-4">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black border border-[#2B2B2B]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
            style={{ backgroundImage: `url('${product.images[activeImageIndex]?.url}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Badges Flotantes */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-black/85 backdrop-blur-md text-xs uppercase text-white font-bold border border-white/20">
              {product.subcategory}
            </span>
            <span className="px-3 py-1 bg-bronto-yellow text-[#151515] text-xs uppercase font-black">
              {product.modality.replace("_", " & ")}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
            <span className="bg-black/80 px-2.5 py-1">
              Ref: <strong className="text-bronto-yellow">{product.sku}</strong>
            </span>
            <span className="bg-black/80 px-2.5 py-1 flex items-center gap-1.5 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {product.availabilityLabel}
            </span>
          </div>
        </div>

        {/* Miniaturas */}
        {product.images.length > 1 && (
          <div className="flex items-center gap-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative w-20 h-16 overflow-hidden border-2 transition-all ${
                  activeImageIndex === index
                    ? "border-bronto-yellow ring-2 ring-bronto-yellow/30"
                    : "border-[#333333] opacity-60 hover:opacity-100"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${img.url}')` }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Títulos y Descripción Comercial */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-bronto-yellow font-bold uppercase tracking-wider">
            {product.commercialName}
          </span>
        </div>

        <h1 className="uppercase text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          {product.name}
        </h1>

        <p className="mt-4 text-base text-white/70 leading-relaxed font-normal">
          {product.fullDescription}
        </p>

        {/* Tarifa de Referencia y Estructura de Precios (+10% aplicada) */}
        <div className="mt-6 p-5 bg-[#181818] border border-[#2B2B2B]">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <span className="text-[11px] uppercase font-bold text-white/50 tracking-wider block">
                Tarifa de Referencia
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-bronto-yellow">
                  {formatCOP(product.pricing.basePrice)}
                </span>
                <span className="text-xs text-white/60">/ {product.pricing.priceUnit}</span>
              </div>
            </div>

            {product.pricing.discountNotice && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#242424] text-bronto-yellow text-[11px] font-bold border border-bronto-yellow/30">
                <Tag className="w-3 h-3" />
                <span>{product.pricing.discountNotice}</span>
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {product.pricing.dailyRate && (
              <div className="p-2.5 bg-[#141414] border border-[#262626]">
                <span className="text-white/50 block text-[10px] uppercase">Tarifa por día:</span>
                <strong className="text-white font-mono">{formatCOP(product.pricing.dailyRate)}</strong>
              </div>
            )}
            {product.pricing.monthlyRate && (
              <div className="p-2.5 bg-[#141414] border border-[#262626]">
                <span className="text-white/50 block text-[10px] uppercase">Tarifa por mes:</span>
                <strong className="text-white font-mono">{formatCOP(product.pricing.monthlyRate)}</strong>
              </div>
            )}
            {product.pricing.operatorDayRate && (
              <div className="p-2.5 bg-[#141414] border border-[#262626]">
                <span className="text-white/50 block text-[10px] uppercase">Operador certificado:</span>
                <strong className="text-white font-mono">{formatCOP(product.pricing.operatorDayRate)} / día</strong>
              </div>
            )}
          </div>

          <p className="mt-3 text-[11px] text-white/60">
            {product.priceNote} Precios ajustados a plazos de contrato y disponibilidad en frentes de obra en Bogotá y la Sabana.
          </p>
        </div>
      </div>

      {/* Controles de Selección y Estimador en Vivo */}
      <div className="p-6 bg-[#181818] border border-[#2B2B2B] space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
          <h3 className="text-xs uppercase tracking-wider text-bronto-yellow font-bold flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Cotizador Rápido para este Equipo</span>
          </h3>
          <span className="text-xs text-white/50">Cálculo instantáneo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Selector de Cantidad */}
          <div>
            <label className="block text-xs text-white/70 uppercase font-semibold mb-2">
              Cantidad de unidades / metros:
            </label>
            <div className="flex items-center border border-[#333333] bg-[#141414]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center bg-transparent text-white font-bold text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Selector de Plazo Estimado */}
          <div>
            <label className="block text-xs text-white/70 uppercase font-semibold mb-2">
              Duración estimada de uso:
            </label>
            <select
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              className="w-full py-3 px-3.5 bg-[#141414] border border-[#333333] text-white text-xs focus:border-bronto-yellow focus:outline-none font-medium"
            >
              <option value="1 a 7 días">1 a 7 días (Jornada puntual)</option>
              <option value="15 días">15 días de operación</option>
              <option value="1 mes">1 mes (Frente continuo)</option>
              <option value="2 a 3 meses">2 a 3 meses</option>
              <option value="4 a 6 meses">4 a 6 meses (Proyecto mediano)</option>
              <option value="Más de 6 meses">Más de 6 meses (Largo plazo)</option>
              <option value="Suministro permanente">Suministro de material / Compra</option>
            </select>
          </div>
        </div>

        {/* Estimación en Vivo */}
        <div className="p-4 bg-[#141414] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] uppercase font-bold text-white/50 block">
              Subtotal Estimado ({quantity} {quantity > 1 ? "unidades" : "unidad"} &bull; {estimatedDuration}):
            </span>
            <span className="text-xl font-black text-bronto-yellow">
              {formatCOP(liveEstimate.equipmentSubtotal)}
            </span>
          </div>
          <span className="text-[11px] text-white/60">Tarifa antes de IVA y flete</span>
        </div>

        {/* Acciones de Cotización */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleAddToQuote}
            className={`w-full sm:flex-1 py-3.5 px-6 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border ${
              addedSuccess
                ? "bg-green-700 border-green-600 text-white"
                : isInBasket(product.id)
                ? "bg-[#252525] border-bronto-yellow text-bronto-yellow"
                : "bg-[#222222] border-[#3A3A3A] hover:border-bronto-yellow text-white"
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Agregado a la lista!</span>
              </>
            ) : isInBasket(product.id) ? (
              <>
                <Check className="w-4 h-4" />
                <span>En su lista (Actualizar cantidad)</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-bronto-yellow" />
                <span>Agregar a la lista</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleQuoteDirectly}
            className="w-full sm:flex-1 py-3.5 px-6 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Cotizar ahora</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {addedSuccess && (
          <div className="p-3 bg-green-950/60 border border-green-700/60 text-xs text-green-300 flex items-center justify-between">
            <span>Equipo añadido. Puede seguir agregando o enviar su cotización.</span>
            <button
              onClick={() => router.push("/cotizar")}
              className="text-white underline font-bold"
            >
              Ver lista &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

