"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/catalog";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { 
  Plus, 
  Minus, 
  Check, 
  ChevronRight, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [estimatedDuration, setEstimatedDuration] = useState("1 mes");
  const [addedSuccess, setAddedSuccess] = useState(false);

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
            <span className="px-3 py-1 bg-black/85 backdrop-blur-md text-xs font-mono uppercase text-white font-bold border border-white/20 rounded-sm">
              {product.subcategory}
            </span>
            <span className="px-3 py-1 bg-bronto-yellow text-[#151515] text-xs font-mono uppercase font-black rounded-sm">
              {product.modality.replace("_", " & ")}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
            <span className="bg-black/70 px-2.5 py-1 rounded">
              Ref: <strong className="text-bronto-yellow">{product.sku}</strong>
            </span>
            <span className="bg-black/70 px-2.5 py-1 rounded flex items-center gap-1.5 text-green-400">
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
                className={`relative w-20 h-16 rounded-sm overflow-hidden border-2 transition-all ${
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
          <span className="font-mono text-xs text-bronto-yellow font-bold uppercase tracking-wider">
            {product.commercialName}
          </span>
        </div>

        <h1 className="font-heading uppercase text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          {product.name}
        </h1>

        <p className="mt-4 text-base text-bronto-gray leading-relaxed font-sans">
          {product.fullDescription}
        </p>

        {/* Nota de Precios Transparente (Regla: no inventar precios fijos) */}
        <div className="mt-6 p-4 bg-[#1A1A1A] border-l-4 border-bronto-yellow rounded-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-bronto-yellow font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Unidad de Cotización: {product.unit}</span>
          </div>
          <p className="mt-1 text-xs text-white/80 font-sans">
            {product.priceNote} Tarifa transparente ajustada a los requisitos específicos de su obra.
          </p>
        </div>
      </div>

      {/* Controles de Selección de Cotización */}
      <div className="p-6 bg-[#181818] border border-[#2B2B2B] rounded-sm space-y-6">
        <h3 className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
          Configurar para Solicitud de Cotización
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Selector de Cantidad */}
          <div>
            <label className="block text-xs font-mono text-white/70 uppercase mb-2">
              Cantidad de unidades / metros:
            </label>
            <div className="flex items-center border border-[#333333] bg-[#141414] rounded-sm">
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
                className="w-full text-center bg-transparent text-white font-mono font-bold text-sm focus:outline-none"
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
            <label className="block text-xs font-mono text-white/70 uppercase mb-2">
              Duración estimada de uso:
            </label>
            <select
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
              className="w-full py-3 px-3.5 bg-[#141414] border border-[#333333] text-white text-xs font-mono rounded-sm focus:border-bronto-yellow focus:outline-none"
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

        {/* Acciones de Cotización */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleAddToQuote}
            className={`w-full sm:flex-1 py-3.5 px-6 rounded-sm font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 border ${
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
            className="w-full sm:flex-1 py-3.5 px-6 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] rounded-sm font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
          >
            <span>Cotizar ahora</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {addedSuccess && (
          <div className="p-3 bg-green-950/60 border border-green-700/60 rounded-sm text-xs font-mono text-green-300 flex items-center justify-between">
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
