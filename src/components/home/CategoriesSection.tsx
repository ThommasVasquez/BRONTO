"use client";

import React from "react";
import Link from "next/link";
import { catalogCategories } from "@/data/catalogData";
import { ArrowUpRight } from "lucide-react";

export const CategoriesSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#151515] border-b border-[#242424] py-12 lg:py-16 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Familias de equipos y soluciones"
    >
      {/* Cabecera Superior */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            SECCIÓN 02 &bull; LÍNEAS DE SUMINISTRO Y ALQUILER
          </span>
          <h2 className="font-heading uppercase text-4xl sm:text-6xl lg:text-7xl font-black text-white mt-1 tracking-tight">
            FAMILIAS DE CATÁLOGO
          </h2>
        </div>
        <p className="text-sm sm:text-base text-bronto-gray max-w-xl font-sans leading-relaxed">
          Desde la primera fase de excavación hasta el último vaciado y acabado de losa en Bogotá y la Sabana. Soluciones articuladas bajo una única logística confiable.
        </p>
      </div>

      {/* Composición Visual Full Width Dinámica que llena el Viewport */}
      <div className="w-full my-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-stretch">
        {catalogCategories.map((cat, index) => (
          <div
            key={cat.id}
            className="group relative overflow-hidden rounded-sm bg-[#1E1E1E] border border-[#2E2E2E] min-h-[340px] lg:min-h-[480px] flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 hover:border-bronto-yellow"
          >
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${cat.imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/70 to-black/40" />

            {/* Cabecera de tarjeta */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-bronto-yellow text-[#151515] font-mono text-[11px] font-black uppercase tracking-wider rounded-sm">
                Familia {String.fromCharCode(65 + index)}
              </span>
              <Link
                href={`/catalogo?categoria=${cat.id}`}
                className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-bronto-yellow group-hover:text-[#151515] text-white flex items-center justify-center transition-colors"
                aria-label={`Ver equipos de ${cat.name}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Contenido inferior */}
            <div className="relative z-10 mt-12">
              <span className="font-mono text-xs uppercase tracking-wider text-bronto-yellow block mb-1">
                {cat.tagline}
              </span>
              <h3 className="font-heading uppercase text-2xl sm:text-3xl font-black text-white leading-tight">
                {cat.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/80 font-sans line-clamp-3">
                {cat.description}
              </p>

              {/* Subcategorías rápidas */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cat.subcategories.slice(0, 3).map((sub, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-black/70 border border-white/15 text-[10px] font-mono text-white/90 rounded-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex items-center justify-between text-xs font-mono text-white/50 border-t border-[#242424]">
        <span>PIDA TODO EN BRONTO &bull; Bogotá D.C., Cota, Chía, Funza, Mosquera, Soacha</span>
        <Link href="/catalogo" className="text-bronto-yellow hover:underline flex items-center gap-1">
          <span>Explorar todas las familias</span>
          &rarr;
        </Link>
      </div>
    </section>
  );
};
