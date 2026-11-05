"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { ChevronRight, PhoneCall } from "lucide-react";

export const FinalCtaSection: React.FC = () => {
  return (
    <section
      className="py-24 bg-[#101010] relative overflow-hidden"
      aria-label="Llamado final a cotizar"
    >
      {/* Fondo con textura industrial */}
      <div className="absolute inset-0 industrial-pattern opacity-40 pointer-events-none" />

      {/* Símbolo Dynastes gigante estilizado de fondo */}
      <div className="absolute -left-24 -bottom-24 z-0 pointer-events-none opacity-5">
        <DynastesBeetleSymbol className="w-[600px] h-[600px]" colorFill="#FEE123" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold block mb-4">
          SECCIÓN 07 &bull; CONTACTO DIRECTO
        </span>

        <h2 className="font-heading uppercase text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none">
          SU PRÓXIMO PROYECTO <br />
          <span className="text-bronto-yellow">EMPIEZA AQUÍ.</span>
        </h2>

        <p className="mt-6 font-heading text-2xl sm:text-3xl text-white/90 uppercase font-bold tracking-wider">
          &ldquo;{siteConfig.tagline}&rdquo;
        </p>

        <p className="mt-4 text-sm sm:text-base text-bronto-gray max-w-xl mx-auto font-sans leading-relaxed">
          Envíenos el listado de maquinaria o materiales que requiere su frente de trabajo. Le responderemos con disponibilidad y propuesta técnica formal.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/cotizar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl rounded-sm active:scale-95"
          >
            <span>Cotizar ahora</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </Link>

          <Link
            href="/contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 hover:border-bronto-yellow text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-bronto-yellow" />
            <span>Hablar con un asesor</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
