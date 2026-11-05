"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { initGSAP, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/data/siteConfig";
import { ChevronRight, ArrowDownRight, MapPin } from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { gsap } = initGSAP();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(
        headlineRef.current,
        {
          opacity: 0,
          y: 35,
          duration: 1,
        },
        0.2
      )
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 25,
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
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#111111] pt-32 pb-10 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Presentación principal BRONTO"
    >
      {/* Fondo fotográfico auténtico de obra real con iluminación industrial */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?q=80&w=2400&auto=format&fit=crop')`,
          }}
        />
        {/* Tratamiento cinematográfico sobrio: sin gradientes artificiales violetas ni tramas de puntos */}
        <div className="absolute inset-0 bg-[#0E0E0E]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/60" />
      </div>

      {/* Franja superior de ubicación y despacho directo */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs text-white/70">
        <div className="inline-flex items-center gap-2 text-white">
          <MapPin className="w-3.5 h-3.5 text-bronto-yellow shrink-0" />
          <span className="font-semibold tracking-wide">
            Despacho en Bogotá D.C., Sabana Centro y Sabana Occidente
          </span>
        </div>
        <span className="hidden md:inline text-xs text-white/60 tracking-wide">
          Maquinaria pesada &bull; Formaletas &bull; Concretos &bull; Aligerados
        </span>
      </div>

      {/* Contenido Central: Tipografía masiva y contundente sin palabras pintadas en amarillo */}
      <div className="relative z-10 w-full my-auto py-8">
        <div className="max-w-5xl">
          <h1
            ref={headlineRef}
            className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] font-black tracking-tight leading-[0.92] uppercase"
          >
            La obra no se detiene.
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/80 font-normal max-w-3xl leading-relaxed"
          >
            Equipos, maquinaria pesada y soluciones técnicas para construcción e industria. Un solo aliado para coordinar excavación, encofrados certificados, concretos estructurales y sistemas de aligeramiento.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider transition-all duration-150 rounded-none active:scale-[0.98]"
            >
              <span>Explorar catálogo</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <Link
              href="/cotizar"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent hover:bg-white/5 border border-white/30 hover:border-bronto-yellow text-white text-xs uppercase tracking-wider font-bold transition-all duration-150 rounded-none"
            >
              <span>Solicitar cotización</span>
              <ArrowDownRight className="w-4 h-4 text-bronto-yellow" />
            </Link>
          </div>
        </div>
      </div>

      {/* Franja de Pie del Hero: Tira de Familias Reales */}
      <div className="relative z-10 w-full pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white">
        <div className="border-l-2 border-bronto-yellow pl-3">
          <span className="text-white font-bold block uppercase tracking-wider text-xs">
            Maquinaria y Equipos
          </span>
          <span className="text-white/60 text-[11px] block mt-0.5">
            Excavación, compactación y energía
          </span>
        </div>
        <div className="border-l-2 border-white/30 pl-3">
          <span className="text-white font-bold block uppercase tracking-wider text-xs">
            Formaletas y Andamios
          </span>
          <span className="text-white/60 text-[11px] block mt-0.5">
            Sistemas certificados Res. 4272
          </span>
        </div>
        <div className="border-l-2 border-white/30 pl-3">
          <span className="text-white font-bold block uppercase tracking-wider text-xs">
            Concretos Estructurales
          </span>
          <span className="text-white/60 text-[11px] block mt-0.5">
            Premezclados y bombeo continuo
          </span>
        </div>
        <div className="border-l-2 border-white/30 pl-3">
          <span className="text-white font-bold block uppercase tracking-wider text-xs">
            Icopores y Aligerados
          </span>
          <span className="text-white/60 text-[11px] block mt-0.5">
            Casetones recuperables y EPS
          </span>
        </div>
      </div>
    </section>
  );
};
