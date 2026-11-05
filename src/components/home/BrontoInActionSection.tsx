"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Activity, Truck, ChevronRight } from "lucide-react";

export const BrontoInActionSection: React.FC = () => {
  return (
    <section
      className="py-24 bg-[#101010] relative overflow-hidden border-b border-[#242424]"
      aria-label="BRONTO en acción y capacidad operativa"
    >
      <div className="absolute inset-0 industrial-stripes opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            SECCIÓN 03 &bull; DESPLIEGUE OPERATIVO
          </span>
          <h2 className="font-heading uppercase text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-2 tracking-tight">
            BRONTO EN ACCIÓN
          </h2>
          <p className="mt-4 text-base text-bronto-gray font-sans">
            Cada equipo entregado a obra pasa por un estricto protocolo de inspección técnico-mecánica y cuenta con soporte de campo para asegurar que el cronograma constructivo se cumpla sin interrupciones.
          </p>
        </div>

        {/* Mosaico Operativo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Preparación Mecánica Rigurosa */}
          <div className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-6 sm:p-8 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-bronto-yellow mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading uppercase text-2xl font-bold text-white tracking-wide">
                Inspección de 40 Puntos
              </h3>
              <p className="mt-3 text-sm text-bronto-gray font-sans leading-relaxed">
                Revisión minuciosa de presiones hidráulicas, niveles de fluidos, sistema de frenos, horómetro certificado y elementos de desgaste antes de cada despacho.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2B2B2B] flex items-center gap-2 text-xs font-mono text-white/70">
              <CheckCircle2 className="w-4 h-4 text-bronto-yellow" />
              <span>Acta de entrega técnica digital</span>
            </div>
          </div>

          {/* Tarjeta 2: Telemetría y Monitoreo */}
          <div className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-6 sm:p-8 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-[#FF6511] mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-heading uppercase text-2xl font-bold text-white tracking-wide">
                Monitoreo y Telemetría
              </h3>
              <p className="mt-3 text-sm text-bronto-gray font-sans leading-relaxed">
                Supervisión de parámetros operativos en flota pesada para anticipar mantenimientos preventivos antes de que ocurra una detención innecesaria.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2B2B2B] flex items-center gap-2 text-xs font-mono text-white/70">
              <CheckCircle2 className="w-4 h-4 text-bronto-yellow" />
              <span>Control transparente de horómetro</span>
            </div>
          </div>

          {/* Tarjeta 3: Logística de Cama Baja Express */}
          <div className="bg-[#181818] border border-[#2B2B2B] rounded-sm p-6 sm:p-8 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-bronto-yellow mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-heading uppercase text-2xl font-bold text-white tracking-wide">
                Despacho a Pie de Obra
              </h3>
              <p className="mt-3 text-sm text-bronto-gray font-sans leading-relaxed">
                Coordinación de camas bajas, camiones grúa y vehículos de respuesta rápida con permisos de tránsito en regla para entrega directa en frente de trabajo.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2B2B2B] flex items-center gap-2 text-xs font-mono text-white/70">
              <CheckCircle2 className="w-4 h-4 text-bronto-yellow" />
              <span>Programación puntual de arribo</span>
            </div>
          </div>
        </div>

        {/* Banner Fotográfico Panorámico con CTA */}
        <div className="mt-12 relative overflow-hidden rounded-sm border border-[#2B2B2B] bg-[#1E1E1E]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 filter grayscale contrast-125"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?q=80&w=2000&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/90 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold block mb-2">
              DISPONIBILIDAD INMEDIATA
            </span>
            <h3 className="font-heading uppercase text-3xl sm:text-4xl font-black text-white leading-tight">
              ¿TIENE UNA FUNDIDA O UN FRENTE URGENTE?
            </h3>
            <p className="mt-4 text-sm sm:text-base text-bronto-gray font-sans">
              Contacte a nuestro equipo de despacho para coordinar la maquinaria o el suministro necesario en tiempo récord.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/cotizar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm transition-colors"
              >
                <span>Cotizar disponibilidad</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-bronto-yellow text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
              >
                <span>Conocer servicios</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
