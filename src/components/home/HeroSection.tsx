"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { initGSAP, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/data/siteConfig";
import { DynastesBeetleSymbol } from "@/components/common/BrandLogo";
import { ChevronRight, ArrowDownRight, Shield, Zap } from "lucide-react";

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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#151515] pt-24 pb-16"
      aria-label="Presentación principal BRONTO"
    >
      {/* Fondo visual industrial de gran formato con overlay cinematográfico */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        {/* Gradientes industriales: oscuro, contraste y viñeteado */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/70 to-[#151515]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/80 to-transparent" />
        <div className="absolute inset-0 industrial-grid opacity-30" />
      </div>

      {/* Marca de agua icónica Dynastes en segundo plano */}
      <div className="absolute -right-20 -bottom-20 z-0 pointer-events-none opacity-5">
        <DynastesBeetleSymbol className="w-[500px] h-[500px]" colorFill="#FEE123" />
      </div>

      {/* Contenido Central */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Badge de concepto oficial */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#242424]/90 border border-bronto-yellow/30 backdrop-blur-md rounded-sm">
              <span className="w-2 h-2 rounded-full bg-bronto-yellow animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
                {siteConfig.tagline}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-[#333333] text-[11px] font-mono text-white/70 rounded-sm">
              <Zap className="w-3 h-3 text-[#FF6511]" />
              <span>Flota Pesada &bull; Formaletas &bull; Concretos</span>
            </div>
          </div>

          {/* Titular Principal Imponente */}
          <h1
            ref={headlineRef}
            className="font-heading uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] text-white"
          >
            {siteConfig.slogan.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-bronto-yellow inline-block">
              {siteConfig.slogan.split(" ").slice(-1)[0]}
            </span>
          </h1>

          {/* Subtítulo Comercial Directo */}
          <p
            ref={subtitleRef}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/85 font-normal max-w-2xl leading-relaxed font-sans"
          >
            {siteConfig.secondarySlogan} Alquiler de maquinaria pesada, equipos menores, formaletas, concretos y sistemas modulados para que sus proyectos avancen sin frenos.
          </p>

          {/* Acciones Comerciales Principales */}
          <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95 rounded-sm"
            >
              <span>Explorar catálogo</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-transparent hover:bg-white/5 border-2 border-white/40 hover:border-bronto-yellow text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded-sm"
            >
              <span>Solicitar cotización</span>
              <ArrowDownRight className="w-4 h-4 text-bronto-yellow" />
            </Link>
          </div>

          {/* Franja de Métricas / Capacidades Operativas */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-bronto-yellow block">
                100%
              </span>
              <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider">
                Disponibilidad en obra
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-white block">
                4 Familias
              </span>
              <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider">
                Soluciones integradas
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-white block">
                24/7
              </span>
              <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider">
                Soporte de alta criticidad
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-bronto-yellow block">
                Nacional
              </span>
              <span className="text-xs font-mono uppercase text-bronto-gray tracking-wider">
                Despacho en Colombia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de desplazamiento sutil */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-60">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          Deslizar
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-bronto-yellow to-transparent" />
      </div>
    </section>
  );
};
