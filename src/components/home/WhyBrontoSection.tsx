"use client";

import React from "react";
import { Wrench, Layers, Clock, FileCheck2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const WhyBrontoSection: React.FC = () => {
  const differentiators = [
    {
      icon: Layers,
      title: "Solución Integral en un Solo Aliado",
      description: "Evite lidiar con múltiples proveedores dispersos. En BRONTO coordina desde maquinaria de excavación y formaletas hasta concretos y sistemas de aligeramiento con un único canal comercial.",
    },
    {
      icon: Wrench,
      title: "Protocolo de Alistamiento Mecánico",
      description: "Cada máquina se despacha con inspección de presiones, fluidos y desgaste completada. En caso de imprevisto mayor en obra, sustituimos el equipo para que el cronograma no sufra demoras.",
    },
    {
      icon: Clock,
      title: "Agilidad de Respuesta Comercial",
      description: "Respuestas técnicas claras en menos de 2 horas hábiles, cubicación preliminar de planos y despachos programados coordinados con el ritmo real de su cuadrilla.",
    },
    {
      icon: FileCheck2,
      title: "Transparencia Contractual y Seguridad",
      description: "Tarifas claras, actas de entrega digitales, soporte para pólizas de equipo y cumplimiento estricto de lineamientos de seguridad y salud en el trabajo.",
    },
  ];

  return (
    <section
      className="py-24 bg-[#151515] relative border-b border-[#242424]"
      aria-label="Diferenciadores y propuesta de valor BRONTO"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado izquierdo: Concepto y Manifiesto */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
              SECCIÓN 06 &bull; PROPUESTA DE VALOR
            </span>
            <h2 className="font-heading uppercase text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              ¿POR QUÉ BRONTO?
            </h2>
            <p className="text-base text-bronto-gray font-sans leading-relaxed">
              La construcción no tolera improvisaciones. Diseñamos nuestros procesos para responder a la presión de los plazos de obra, brindando maquinaria confiable y materiales certificados.
            </p>
            <div className="p-4 bg-[#1C1C1C] border-l-4 border-bronto-yellow text-white text-xs font-mono space-y-1">
              <span className="text-bronto-yellow font-bold uppercase tracking-wider block">
                COMPROMISO OPERATIVO:
              </span>
              <p className="text-white/80">
                &ldquo;Si una máquina requiere reparación prolongada, procedemos con el cambio prioritario. La obra no se detiene.&rdquo;
              </p>
            </div>
            <div>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-bronto-yellow hover:underline"
              >
                <span>Conocer nuestra filosofía de trabajo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Lado derecho: Cuadrícula de Diferenciadores */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <div
                  key={index}
                  className="bg-[#1A1A1A] border border-[#2B2B2B] p-6 rounded-sm hover:border-bronto-yellow transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-bronto-yellow mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading uppercase text-lg font-bold text-white tracking-wide">
                    {diff.title}
                  </h3>
                  <p className="mt-2 text-xs text-bronto-gray leading-relaxed font-sans">
                    {diff.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
