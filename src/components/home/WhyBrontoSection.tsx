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
      title: "Agilidad en Bogotá y la Sabana",
      description: "Tiempos de respuesta técnica en menos de 2 horas hábiles, rutas de despacho express por Calle 80, Autonorte y variante Siberia-Cota-Chía coordinadas con su avance de obra.",
    },
    {
      icon: FileCheck2,
      title: "Transparencia Contractual y Seguridad",
      description: "Tarifas claras, actas de entrega digitales, soporte para pólizas de equipo y cumplimiento estricto de lineamientos de seguridad y salud en el trabajo.",
    },
  ];

  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#151515] border-b border-[#242424] py-12 lg:py-16 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Diferenciadores y propuesta de valor BRONTO"
    >
      {/* Cabecera */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            SECCIÓN 06 &bull; PROPUESTA DE VALOR INDUSTRIAL
          </span>
          <h2 className="font-heading uppercase text-4xl sm:text-6xl lg:text-7xl font-black text-white mt-1 tracking-tight">
            ¿POR QUÉ BRONTO?
          </h2>
        </div>
        <p className="text-sm sm:text-base text-bronto-gray max-w-xl font-sans leading-relaxed">
          La construcción en Bogotá y municipios aledaños no tolera improvisaciones. Diseñamos nuestros procesos para responder a la presión de los plazos de obra, brindando maquinaria confiable y materiales certificados.
        </p>
      </div>

      {/* Contenido Split Screen Full Width que llena el Viewport */}
      <div className="w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">
        {/* Lado izquierdo: Manifiesto y Compromiso (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#1C1C1C] border-l-4 border-bronto-yellow rounded-sm text-white space-y-2">
            <span className="text-bronto-yellow font-mono text-xs font-bold uppercase tracking-wider block">
              COMPROMISO OPERATIVO:
            </span>
            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed">
              &ldquo;Si una máquina requiere reparación prolongada, procedemos con el cambio prioritario de la unidad. La obra no se detiene.&rdquo;
            </p>
          </div>

          <p className="text-sm text-bronto-gray font-sans leading-relaxed">
            Centralizamos los frentes críticos de la construcción: tierra, encofrado, concreto y aligeramiento. Un único equipo de soporte, facturación unificada y optimización de fletes.
          </p>

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

        {/* Lado derecho: Cuadrícula de Diferenciadores (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="bg-[#1A1A1A] border border-[#2B2B2B] p-6 rounded-sm hover:border-bronto-yellow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-bronto-yellow mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading uppercase text-xl font-bold text-white tracking-wide">
                    {diff.title}
                  </h3>
                  <p className="mt-2 text-xs text-bronto-gray leading-relaxed font-sans">
                    {diff.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pie de sección */}
      <div className="w-full pt-4 flex items-center justify-between text-xs font-mono text-white/50 border-t border-[#242424]">
        <span>PIDA TODO EN BRONTO &bull; Sin sobrecostos por dispersión de proveedores</span>
        <Link href="/contacto" className="text-bronto-yellow hover:underline">
          Hablar con gerencia técnica &rarr;
        </Link>
      </div>
    </section>
  );
};
