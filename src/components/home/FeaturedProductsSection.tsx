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
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#101010] border-b border-[#242424] py-12 lg:py-16 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Equipos y soluciones destacadas del catálogo"
    >
      {/* Cabecera */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            SECCIÓN 05 &bull; FLOTA DISPONIBLE EN BODEGA
          </span>
          <h2 className="font-heading uppercase text-4xl sm:text-6xl lg:text-7xl font-black text-white mt-1 tracking-tight">
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

      {/* Rejilla de Productos Full Width que llena el Viewport */}
      <div className="w-full my-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 items-stretch flex-1">
        {featured.map((product) => {
          const inBasket = isInBasket(product.id);

          return (
            <div
              key={product.id}
              className="bg-[#181818] border border-[#2B2B2B] rounded-sm flex flex-col justify-between overflow-hidden group hover:border-bronto-yellow transition-all duration-300"
            >
              {/* Imagen del producto */}
              <div className="relative aspect-[16/11] overflow-hidden bg-black/50">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.images[0]?.url}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30" />

                {/* Etiquetas superiores */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 bg-black/80 backdrop-blur-sm text-[9px] font-mono uppercase text-white font-bold rounded-sm">
                    {product.subcategory}
                  </span>
                </div>

                <div className="absolute top-2 right-2">
                  <span className="px-1.5 py-0.5 bg-bronto-yellow text-[#151515] text-[9px] font-mono uppercase font-black rounded-sm">
                    {product.modality.replace("_", " & ")}
                  </span>
                </div>
              </div>

              {/* Información del equipo */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-white/50 block mb-0.5">{product.sku}</span>
                  <h3 className="font-heading uppercase text-base font-bold text-white group-hover:text-bronto-yellow transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] text-bronto-gray line-clamp-2 font-sans">
                    {product.shortDescription}
                  </p>

                  {/* Especificaciones clave */}
                  <div className="mt-3 pt-2 border-t border-[#2B2B2B] space-y-1">
                    {product.specifications.slice(0, 2).map((spec, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-white/50 truncate pr-1">{spec.label}:</span>
                        <span className="text-white font-semibold shrink-0">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="mt-4 pt-3 border-t border-[#2B2B2B] flex items-center gap-1.5">
                  <Link
                    href={`/catalogo/${product.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 bg-[#242424] hover:bg-[#2F2F2F] text-white text-[11px] font-mono uppercase rounded-sm transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Ver</span>
                  </Link>

                  <button
                    onClick={() => addItem(product, 1)}
                    className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-2 text-[11px] font-mono uppercase rounded-sm transition-colors ${
                      inBasket
                        ? "bg-green-700/80 text-white"
                        : "bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black"
                    }`}
                  >
                    {inBasket ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Listo</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
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

      {/* Pie de sección */}
      <div className="w-full pt-4 flex items-center justify-between text-xs font-mono text-white/50 border-t border-[#242424]">
        <span>Cotización directa sin intermediarios con entrega en obra en Bogotá y Sabana</span>
        <Link href="/catalogo" className="text-bronto-yellow hover:underline">
          Ver todas las referencias &rarr;
        </Link>
      </div>
    </section>
  );
};
