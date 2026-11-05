"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { catalogProducts } from "@/data/catalogData";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { formatCOP } from "@/lib/pricing";
import { Eye, Plus, Check, ArrowRight } from "lucide-react";

export const FeaturedProductsSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { addItem, isInBasket } = useQuoteBasket();
  const featured = catalogProducts.filter((p) => p.featured).slice(0, 6);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#0E0E0E] border-b border-[#242424] py-14 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Equipos y soluciones destacadas del catálogo"
    >
      {/* Cabecera */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Equipos destacados
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl font-normal">
            Flota pesada, encofrados certificados, mezclas estructurales y elementos de aligeramiento con disponibilidad para Bogotá y Sabana.
          </p>
        </div>
        <Link
          href="/catalogo"
          className="text-xs font-bold uppercase tracking-wider text-bronto-yellow hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <span>Catálogo completo ({catalogProducts.length} referencias)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid de Productos Industrial */}
      <div className="w-full my-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-stretch flex-1">
        {featured.map((product) => {
          const inBasket = mounted && isInBasket(product.id);

          return (
            <div
              key={product.id}
              className="bg-[#151515] border border-[#242424] hover:border-bronto-yellow flex flex-col justify-between overflow-hidden transition-colors duration-150 group"
            >
              {/* Imagen del equipo */}
              <div className="relative aspect-[16/11] overflow-hidden bg-black/60">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.images[0]?.url}')` }}
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 uppercase tracking-wide">
                    {product.modality.replace("_", " / ")}
                  </span>
                </div>
              </div>

              {/* Información */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-white/50 block tracking-wider uppercase">
                    {product.sku}
                  </span>
                  <h3 className="text-white text-base font-bold uppercase leading-tight mt-1 group-hover:text-bronto-yellow transition-colors">
                    {product.name}
                  </h3>

                  {/* Especificaciones clave */}
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                    {product.specifications.slice(0, 2).map((spec, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px]">
                        <span className="text-white/50 truncate pr-1">{spec.label}:</span>
                        <span className="text-white font-semibold shrink-0">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  {/* Tarifa de Referencia (+10% aplicada) */}
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-[10px] text-white/50 uppercase font-semibold">Tarifa Ref.</span>
                    <div className="text-right">
                      <span className="text-sm font-black text-bronto-yellow">
                        {formatCOP(product.pricing.basePrice)}
                      </span>
                      <span className="text-[10px] text-white/50 block font-normal">/ {product.pricing.priceUnit}</span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                  <Link
                    href={`/catalogo/${product.slug}`}
                    className="flex-1 text-center py-2 px-2 bg-[#202020] hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase transition-colors"
                  >
                    Ficha
                  </Link>

                  <button
                    onClick={() => addItem(product, 1)}
                    className={`flex-1 text-center py-2 px-2 text-xs font-bold uppercase transition-colors ${
                      inBasket
                        ? "bg-green-700 text-white"
                        : "bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111]"
                    }`}
                  >
                    {inBasket ? "En lista" : "+ Cotizar"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 border-t border-[#242424] gap-2">
        <span>Precios adaptados a plazo de obra y volumen requerido</span>
        <Link href="/cotizar" className="text-bronto-yellow hover:underline">
          Consolidar lista de equipos en cotización &rarr;
        </Link>
      </div>
    </section>
  );
};
