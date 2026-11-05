"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const WhyBrontoSection: React.FC = () => {
  const differentiators = [
    {
      title: "Unificación de frentes de obra",
      description: "Coordine excavación, encofrado, concreto bombeable y sistemas de aligeramiento con un único interlocutor técnico y facturación consolidada, reduciendo fletes y trámites administrativos.",
    },
    {
      title: "Compromiso de sustitución mecánica",
      description: "Si una máquina presenta una eventualidad técnica que requiera intervención prolongada, procedemos con el cambio prioritario de la unidad para garantizar la continuidad del cronograma.",
    },
    {
      title: "Documentación y normativa al día",
      description: "Planillas de seguridad social, certificados de competencias laborales de operadores, memorias de cálculo de andamios y ensayos de concreto listos para radicación ante interventoría.",
    },
    {
      title: "Ubicación estratégica en la Sabana",
      description: "Centro de acopio y patio de maquinaria ubicado sobre el corredor industrial Calle 80 / Siberia, con acceso inmediato a Bogotá, Cota, Chía, Funza, Mosquera y Soacha.",
    },
  ];

  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#111111] border-b border-[#242424] py-14 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Diferenciadores y propuesta de valor BRONTO"
    >
      {/* Cabecera */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Por qué elegir BRONTO
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl font-normal">
            Criterios de ingeniería y logística pensados para responder a las exigencias reales de contratistas y empresas de construcción.
          </p>
        </div>
        <Link
          href="/nosotros"
          className="text-xs font-bold uppercase tracking-wider text-bronto-yellow hover:text-white transition-colors inline-flex items-center gap-1.5"
        >
          <span>Conocer nuestra operación</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid de 4 Pilares de Ingeniería */}
      <div className="w-full my-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch flex-1">
        {differentiators.map((diff, index) => (
          <div
            key={index}
            className="bg-[#161616] border-t-2 border-bronto-yellow p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-white text-xl font-black uppercase tracking-tight">
                {diff.title}
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                {diff.description}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-bronto-yellow font-bold uppercase tracking-wider">
              Respaldo BRONTO en obra
            </div>
          </div>
        ))}
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 border-t border-[#242424] gap-2">
        <span>Sin intermediarios &bull; Contacto directo con despachadores técnicos</span>
        <Link href="/contacto" className="text-bronto-yellow hover:underline">
          Hablar con un asesor comercial &rarr;
        </Link>
      </div>
    </section>
  );
};
