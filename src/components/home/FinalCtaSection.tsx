"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { ChevronRight, PhoneCall } from "lucide-react";

export const FinalCtaSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#101010] py-12 lg:py-16 px-6 sm:px-10 lg:px-16 2xl:px-24 overflow-hidden"
      aria-label="Llamado final a cotizar"
    >
      {/* Fondo con textura industrial */}
      <div className="absolute inset-0 industrial-pattern opacity-40 pointer-events-none" />

      {/* Símbolo Dynastes gigante de fondo */}
      <div className="absolute -left-20 -bottom-20 z-0 pointer-events-none opacity-5">
        <DynastesBeetleSymbol className="w-[680px] h-[680px]" size={680} />
      </div>

      {/* Encabezado sutil */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-bronto-yellow font-bold uppercase tracking-widest pb-4 border-b border-[#242424]">
        <span>SECCIÓN 07 &bull; RADICACIÓN Y ASESORÍA COMERCIAL</span>
        <span className="text-white/50 hidden sm:inline">BOGOTÁ Y SABANA &bull; COBERTURA DIRECTA</span>
      </div>

      {/* Contenido Central Imponente en Pantalla Completa */}
      <div className="relative z-10 w-full my-auto py-10 max-w-6xl mx-auto text-center">
        <h2 className="font-heading uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-[0.92]">
          SU PRÓXIMO PROYECTO <br />
          <span className="text-bronto-yellow">EMPIEZA AQUÍ.</span>
        </h2>

        <p className="mt-8 font-heading text-2xl sm:text-4xl text-white/90 uppercase font-black tracking-wider">
          &ldquo;{siteConfig.tagline}&rdquo;
        </p>

        <p className="mt-4 text-base sm:text-lg text-bronto-gray max-w-2xl mx-auto font-sans leading-relaxed">
          Envíenos el listado de maquinaria o materiales que requiere su frente de trabajo en Bogotá o la Sabana. Le responderemos con disponibilidad y propuesta técnica formal.
        </p>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/cotizar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-yellow-500/20 rounded-sm active:scale-95"
          >
            <span>Cotizar ahora</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </Link>

          <Link
            href="/contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-5 border-2 border-white/30 hover:border-bronto-yellow text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-bronto-yellow" />
            <span>Hablar con un asesor</span>
          </Link>
        </div>
      </div>

      {/* Pie de sección */}
      <div className="relative z-10 w-full pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 border-t border-[#242424] gap-2">
        <span>Despacho express a pie de obra en Bogotá D.C. y Sabana</span>
        <span>BRONTO &bull; PIDA TODO EN BRONTO</span>
      </div>
    </section>
  );
};
