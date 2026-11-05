"use client";

import React from "react";
import Link from "next/link";
import { catalogCategories } from "@/data/catalogData";
import { ArrowUpRight } from "lucide-react";

export const CategoriesSection: React.FC = () => {
  return (
    <section
      className="py-24 bg-[#151515] relative border-b border-[#242424]"
      aria-label="Familias de equipos y soluciones"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
              SECCIÓN 02 &bull; LÍNEAS DE SUMINISTRO
            </span>
            <h2 className="font-heading uppercase text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-2 tracking-tight">
              FAMILIAS DE CATÁLOGO
            </h2>
          </div>
          <p className="text-sm md:text-base text-bronto-gray max-w-md font-sans leading-relaxed">
            Desde la primera fase de excavación hasta el último vaciado y acabado de losa. Todo articulado bajo una única logística confiable.
          </p>
        </div>

        {/* Composición Visual Asimétrica Dinámica (No genérica) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Categoría 1: Maquinaria y Equipos (Dominante, 7 columnas) */}
          <div className="lg:col-span-7 group relative overflow-hidden rounded-sm bg-[#1E1E1E] border border-[#2E2E2E] min-h-[420px] flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:border-bronto-yellow">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${catalogCategories[0].imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/75 to-black/40" />

            {/* Cabecera de tarjeta */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-bronto-yellow text-[#151515] font-mono text-[11px] font-bold uppercase tracking-wider rounded-sm">
                Familia A
              </span>
              <Link
                href={`/catalogo?categoria=${catalogCategories[0].id}`}
                className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-bronto-yellow group-hover:text-[#151515] text-white flex items-center justify-center transition-colors"
                aria-label={`Ver equipos de ${catalogCategories[0].name}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Contenido inferior */}
            <div className="relative z-10 mt-20">
              <span className="font-mono text-xs uppercase tracking-wider text-bronto-yellow block mb-1">
                {catalogCategories[0].tagline}
              </span>
              <h3 className="font-heading uppercase text-3xl sm:text-4xl font-black text-white leading-tight">
                {catalogCategories[0].name}
              </h3>
              <p className="mt-3 text-sm text-white/80 max-w-xl font-sans">
                {catalogCategories[0].description}
              </p>

              {/* Subcategorías rápidas */}
              <div className="mt-6 flex flex-wrap gap-2">
                {catalogCategories[0].subcategories.slice(0, 4).map((sub, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-black/60 border border-white/15 text-[11px] font-mono text-white/90 rounded-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Categoría 2: Formaletas y Sistemas (5 columnas) */}
          <div className="lg:col-span-5 group relative overflow-hidden rounded-sm bg-[#1E1E1E] border border-[#2E2E2E] min-h-[420px] flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:border-bronto-yellow">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${catalogCategories[1].imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/75 to-black/40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-[#242424] text-white font-mono text-[11px] font-bold uppercase tracking-wider border border-[#333333] rounded-sm">
                Familia B
              </span>
              <Link
                href={`/catalogo?categoria=${catalogCategories[1].id}`}
                className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-bronto-yellow group-hover:text-[#151515] text-white flex items-center justify-center transition-colors"
                aria-label={`Ver equipos de ${catalogCategories[1].name}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative z-10 mt-20">
              <span className="font-mono text-xs uppercase tracking-wider text-bronto-yellow block mb-1">
                {catalogCategories[1].tagline}
              </span>
              <h3 className="font-heading uppercase text-2xl sm:text-3xl font-black text-white leading-tight">
                {catalogCategories[1].name}
              </h3>
              <p className="mt-3 text-sm text-white/80 font-sans">
                {catalogCategories[1].description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {catalogCategories[1].subcategories.slice(0, 3).map((sub, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-black/60 border border-white/15 text-[11px] font-mono text-white/90 rounded-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Categoría 3: Concretos y Soluciones Estructurales (5 columnas) */}
          <div className="lg:col-span-5 group relative overflow-hidden rounded-sm bg-[#1E1E1E] border border-[#2E2E2E] min-h-[420px] flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:border-bronto-yellow">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${catalogCategories[2].imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/75 to-black/40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-[#242424] text-white font-mono text-[11px] font-bold uppercase tracking-wider border border-[#333333] rounded-sm">
                Familia C
              </span>
              <Link
                href={`/catalogo?categoria=${catalogCategories[2].id}`}
                className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-bronto-yellow group-hover:text-[#151515] text-white flex items-center justify-center transition-colors"
                aria-label={`Ver catálogo de ${catalogCategories[2].name}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative z-10 mt-20">
              <span className="font-mono text-xs uppercase tracking-wider text-bronto-yellow block mb-1">
                {catalogCategories[2].tagline}
              </span>
              <h3 className="font-heading uppercase text-2xl sm:text-3xl font-black text-white leading-tight">
                {catalogCategories[2].name}
              </h3>
              <p className="mt-3 text-sm text-white/80 font-sans">
                {catalogCategories[2].description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {catalogCategories[2].subcategories.slice(0, 3).map((sub, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-black/60 border border-white/15 text-[11px] font-mono text-white/90 rounded-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Categoría 4: Icopores y Sistemas Modulados (7 columnas) */}
          <div className="lg:col-span-7 group relative overflow-hidden rounded-sm bg-[#1E1E1E] border border-[#2E2E2E] min-h-[420px] flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:border-bronto-yellow">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${catalogCategories[3].imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/75 to-black/40" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-bronto-yellow text-[#151515] font-mono text-[11px] font-bold uppercase tracking-wider rounded-sm">
                Familia D
              </span>
              <Link
                href={`/catalogo?categoria=${catalogCategories[3].id}`}
                className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-bronto-yellow group-hover:text-[#151515] text-white flex items-center justify-center transition-colors"
                aria-label={`Ver catálogo de ${catalogCategories[3].name}`}
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative z-10 mt-20">
              <span className="font-mono text-xs uppercase tracking-wider text-bronto-yellow block mb-1">
                {catalogCategories[3].tagline}
              </span>
              <h3 className="font-heading uppercase text-3xl sm:text-4xl font-black text-white leading-tight">
                {catalogCategories[3].name}
              </h3>
              <p className="mt-3 text-sm text-white/80 max-w-xl font-sans">
                {catalogCategories[3].description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {catalogCategories[3].subcategories.slice(0, 4).map((sub, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-black/60 border border-white/15 text-[11px] font-mono text-white/90 rounded-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
