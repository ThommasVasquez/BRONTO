"use client";

import React from "react";
import Link from "next/link";
import { catalogProducts } from "@/data/catalogData";
import { useQuoteBasket } from "@/components/quote/QuoteBasketProvider";
import { Eye, Plus, Check, ChevronRight } from "lucide-react";

export const FeaturedProductsSection: React.FC = () => {
  const { addItem, isInBasket } = useQuoteBasket();
  const featured = catalogProducts.filter((p) => p.featured).slice(0, 6);

  return (
    <section
      className="py-24 bg-[#101010] relative border-b border-[#242424]"
      aria-label="Equipos y soluciones destacadas del catálogo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
              SECCIÓN 05 &bull; FLOTA Y SUMINISTRO DISPONIBLE
            </span>
            <h2 className="font-heading uppercase text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-2 tracking-tight">
              CATÁLOGO DESTACADO
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-bronto-yellow hover:underline"
          >
            <span>Ver catálogo completo ({catalogProducts.length} referencias)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Rejilla de Productos Destacados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => {
            const inBasket = isInBasket(product.id);

            return (
              <div
                key={product.id}
                className="bg-[#181818] border border-[#2B2B2B] rounded-sm flex flex-col justify-between overflow-hidden group hover:border-bronto-yellow transition-all duration-300"
              >
                {/* Imagen del producto */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('${product.images[0]?.url}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30" />

                  {/* Etiquetas superiores */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-black/80 backdrop-blur-sm border border-white/20 text-[10px] font-mono uppercase text-white font-bold rounded-sm">
                      {product.subcategory}
                    </span>
                    <span className="px-2 py-0.5 bg-bronto-yellow text-[#151515] text-[10px] font-mono uppercase font-bold rounded-sm">
                      {product.modality.replace("_", " & ")}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono text-white/70 bg-black/70 px-2 py-0.5 rounded border border-white/10">
                      {product.sku}
                    </span>
                  </div>
                </div>

                {/* Información del equipo */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading uppercase text-xl font-bold text-white group-hover:text-bronto-yellow transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs text-bronto-gray line-clamp-2 font-sans">
                      {product.shortDescription}
                    </p>

                    {/* Especificaciones clave */}
                    <div className="mt-4 pt-4 border-t border-[#2B2B2B] space-y-1.5">
                      {product.specifications.slice(0, 3).map((spec, i) => (
                        <div key={i} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-white/60">{spec.label}:</span>
                          <span className="text-white font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="mt-6 pt-4 border-t border-[#2B2B2B] flex items-center gap-2">
                    <Link
                      href={`/catalogo/${product.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#242424] hover:bg-[#2F2F2F] text-white text-xs font-mono uppercase tracking-wider rounded-sm transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver equipo</span>
                    </Link>

                    <button
                      onClick={() => addItem(product, 1)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ${
                        inBasket
                          ? "bg-green-700/80 text-white cursor-default"
                          : "bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black"
                      }`}
                    >
                      {inBasket ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Agregado</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Cotizar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
