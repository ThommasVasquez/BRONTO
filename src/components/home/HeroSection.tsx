"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { initGSAP, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/data/siteConfig";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { ChevronRight, ArrowDownRight, Zap } from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { gsap } = initGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#151515] pt-28 pb-10 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Presentación principal BRONTO"
    >
      {/* Fondo visual industrial de gran formato con overlay cinematográfico */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?q=80&w=2400&auto=format&fit=crop')`,
          }}
        />
        {/* Gradientes industriales: oscuro, contraste y viñeteado */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/75 to-[#151515]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/85 to-transparent" />
        <div className="absolute inset-0 industrial-grid opacity-30" />
      </div>

      {/* Marca de agua icónica Dynastes en segundo plano */}
      <div className="absolute -right-16 bottom-0 z-0 pointer-events-none opacity-5">
        <DynastesBeetleSymbol className="w-[580px] h-[580px]" size={580} />
      </div>

      {/* Cabecera / Badge superior */}
      <div className="relative z-10 w-full pt-4">
        <div ref={badgeRef} className="inline-flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#242424]/90 border border-bronto-yellow/30 backdrop-blur-md rounded-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-bronto-yellow animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
              {siteConfig.tagline}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-black/50 border border-[#333333] text-xs font-mono text-white/80 rounded-sm">
            <Zap className="w-3.5 h-3.5 text-[#FF6511]" />
            <span>Bogotá &bull; Sabana Centro &bull; Sabana Occidente</span>
          </div>
        </div>
      </div>

      {/* Bloque Central Imponente Full Width */}
      <div className="relative z-10 w-full my-auto py-6">
        <div className="max-w-6xl">
          {/* Titular Principal */}
          <h1
            ref={headlineRef}
            className="font-heading uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-black tracking-tight leading-[0.9] text-white"
          >
            {siteConfig.slogan.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-bronto-yellow inline-block">
              {siteConfig.slogan.split(" ").slice(-1)[0]}
            </span>
          </h1>

          {/* Subtítulo Comercial */}
          <p
            ref={subtitleRef}
            className="mt-6 text-lg sm:text-2xl md:text-3xl text-white/90 font-normal max-w-4xl leading-relaxed font-sans"
          >
            {siteConfig.secondarySlogan} Alquiler y suministro de maquinaria pesada, equipos menores, formaletas, concretos y sistemas modulados con despacho express en <strong className="text-white font-semibold">Bogotá y municipios de la Sabana</strong>.
          </p>

          {/* Acciones Comerciales */}
          <div ref={ctaRef} className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-2xl hover:shadow-yellow-500/20 active:scale-95 rounded-sm"
            >
              <span>Explorar catálogo completo</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-5 bg-transparent hover:bg-white/5 border-2 border-white/40 hover:border-bronto-yellow text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded-sm"
            >
              <span>Solicitar cotización de obra</span>
              <ArrowDownRight className="w-4 h-4 text-bronto-yellow" />
            </Link>
          </div>
        </div>
      </div>

      {/* Franja Inferior de Métricas Operativas a lo ancho de la pantalla */}
      <div className="relative z-10 w-full pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-bronto-yellow block leading-none">
            100%
          </span>
          <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider mt-1 block">
            Disponibilidad en obra
          </span>
        </div>
        <div>
          <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-white block leading-none">
            4 Familias
          </span>
          <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider mt-1 block">
            Soluciones integradas
          </span>
        </div>
        <div>
          <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-white block leading-none">
            24/7
          </span>
          <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider mt-1 block">
            Soporte de alta criticidad
          </span>
        </div>
        <div>
          <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-bronto-yellow block leading-none truncate">
            Bogotá & Sabana
          </span>
          <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider mt-1 block">
            Despacho Express en obra
          </span>
        </div>
      </div>
    </section>
  );
};
