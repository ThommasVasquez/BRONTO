"use client";

import React from "react";
import Link from "next/link";
import { catalogCategories } from "@/data/catalogData";
import { ArrowUpRight } from "lucide-react";

export const CategoriesSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#111111] border-b border-[#242424] py-14 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Familias de equipos y soluciones"
    >
      {/* Cabecera Editorial Limpia */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Líneas de suministro y alquiler
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl font-normal">
            Cuatro familias especializadas para cubrir cada etapa del proyecto constructivo en Bogotá y municipios de la Sabana.
          </p>
        </div>
        <Link
          href="/catalogo"
          className="text-xs font-bold uppercase tracking-wider text-bronto-yellow hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <span>Consultar inventario disponible</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid Editorial Estructural */}
      <div className="w-full my-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch flex-1">
        {catalogCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalogo?categoria=${cat.id}`}
            className="group relative overflow-hidden bg-[#181818] border border-[#262626] hover:border-bronto-yellow min-h-[380px] lg:min-h-[480px] flex flex-col justify-between p-7 transition-colors duration-200"
          >
            {/* Imagen de fondo con filtro sobrio */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-40 group-hover:opacity-50"
              style={{ backgroundImage: `url('${cat.imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" />

            {/* Cabecera de bloque */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                {cat.shortName}
              </span>
              <div className="w-8 h-8 rounded-none border border-white/20 group-hover:border-bronto-yellow group-hover:bg-bronto-yellow group-hover:text-black text-white flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Contenido inferior */}
            <div className="relative z-10 mt-auto pt-12">
              <h3 className="text-white text-2xl lg:text-3xl font-black uppercase leading-tight group-hover:text-bronto-yellow transition-colors">
                {cat.name}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-white/70 font-normal leading-relaxed line-clamp-3">
                {cat.description}
              </p>

              {/* Subcategorías limpias */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                {cat.subcategories.slice(0, 3).map((sub, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-white/80 bg-black/60 px-2 py-0.5 border border-white/10"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 border-t border-[#242424] gap-2">
        <span>Flota propia y alistada para despacho a pie de obra</span>
        <span>Atención directa para contratistas e ingenieros residentes</span>
      </div>
    </section>
  );
};
