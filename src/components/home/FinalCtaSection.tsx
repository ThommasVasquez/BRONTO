"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, PhoneCall } from "lucide-react";

export const FinalCtaSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#0E0E0E] py-14 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Llamado final a cotizar"
    >
      {/* Encabezado discreto */}
      <div className="w-full flex items-center justify-between text-xs text-white/50 pb-4 border-b border-[#242424]">
        <span className="uppercase tracking-wider font-semibold">Atención comercial directa</span>
        <span>Bogotá D.C. y Sabana de Cundinamarca</span>
      </div>

      {/* Contenido Central Monumental */}
      <div className="w-full my-auto py-12 max-w-5xl mx-auto text-center">
        <h2 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black uppercase tracking-tight leading-[0.92]">
          Pida todo en BRONTO.
        </h2>

        <p className="mt-8 text-xl sm:text-3xl text-white/90 font-bold uppercase tracking-tight">
          Su próximo proyecto empieza aquí.
        </p>

        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-normal leading-relaxed">
          Envíenos el listado de maquinaria, formaletas o materiales que requiere su frente de trabajo en Bogotá o la Sabana. Emitimos cotización formal ajustada a su cronograma.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/cotizar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-all duration-150 rounded-none active:scale-[0.98]"
          >
            <span>Cotizar ahora</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </Link>

          <Link
            href="/contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-5 border border-white/30 hover:border-bronto-yellow text-white text-xs uppercase tracking-wider font-bold transition-all duration-150 rounded-none"
          >
            <PhoneCall className="w-4 h-4 text-bronto-yellow" />
            <span>Contactar asesor técnico</span>
          </Link>
        </div>
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 border-t border-[#242424] gap-2">
        <span>Flota revisada y alistada para despacho inmediato</span>
        <span>BRONTO &bull; Alquiler y suministro para construcción</span>
      </div>
    </section>
  );
};
