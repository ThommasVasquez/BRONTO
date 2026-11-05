"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Activity, Truck, ChevronRight } from "lucide-react";

export const BrontoInActionSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#101010] border-b border-[#242424] py-12 lg:py-16 px-6 sm:px-10 lg:px-16 2xl:px-24 overflow-hidden"
      aria-label="BRONTO en acción y capacidad operativa"
    >
      <div className="absolute inset-0 industrial-stripes opacity-20 pointer-events-none" />

      {/* Cabecera */}
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold">
            SECCIÓN 03 &bull; DESPLIEGUE OPERATIVO Y LOGÍSTICA
          </span>
          <h2 className="font-heading uppercase text-4xl sm:text-6xl lg:text-7xl font-black text-white mt-1 tracking-tight">
            BRONTO EN ACCIÓN
          </h2>
        </div>
        <p className="text-sm sm:text-base text-bronto-gray max-w-xl font-sans leading-relaxed">
          Cada máquina y sistema despachado a frentes de obra en Bogotá y la Sabana pasa por un riguroso protocolo de alistamiento técnico para evitar tiempos muertos en su cronograma.
        </p>
      </div>

      {/* Mosaico Operativo Full Width que ocupa el centro del Viewport */}
      <div className="relative z-10 w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Tarjeta 1: Inspección de 40 Puntos (4 cols) */}
        <div className="lg:col-span-4 bg-[#181818] border border-[#2B2B2B] rounded-sm p-8 sm:p-10 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300 min-h-[300px]">
          <div>
            <div className="w-14 h-14 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-bronto-yellow mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-heading uppercase text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Inspección de 40 Puntos
            </h3>
            <p className="mt-3 text-sm text-bronto-gray font-sans leading-relaxed">
              Verificación rigurosa de presiones hidráulicas, niveles de fluidos, sistema de frenos y horómetro antes de cada salida a obra.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[#2B2B2B] flex items-center gap-2 text-xs font-mono text-white/80">
            <CheckCircle2 className="w-4 h-4 text-bronto-yellow shrink-0" />
            <span>Acta de entrega técnica digital</span>
          </div>
        </div>

        {/* Tarjeta 2: Telemetría y Monitoreo (4 cols) */}
        <div className="lg:col-span-4 bg-[#181818] border border-[#2B2B2B] rounded-sm p-8 sm:p-10 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300 min-h-[300px]">
          <div>
            <div className="w-14 h-14 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-[#FF6511] mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="font-heading uppercase text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Monitoreo y Telemetría
            </h3>
            <p className="mt-3 text-sm text-bronto-gray font-sans leading-relaxed">
              Supervisión de parámetros operativos en flota pesada para anticipar mantenimientos preventivos antes de que ocurra una detención.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[#2B2B2B] flex items-center gap-2 text-xs font-mono text-white/80">
            <CheckCircle2 className="w-4 h-4 text-bronto-yellow shrink-0" />
            <span>Control transparente de horómetro</span>
          </div>
        </div>

        {/* Tarjeta 3: Logística Cama Baja Sabana (4 cols) */}
        <div className="lg:col-span-4 bg-[#181818] border border-[#2B2B2B] rounded-sm p-8 sm:p-10 flex flex-col justify-between group hover:border-bronto-yellow transition-all duration-300 min-h-[300px]">
          <div>
            <div className="w-14 h-14 bg-bronto-carbon border border-[#333333] rounded-sm flex items-center justify-center text-bronto-yellow mb-6 group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-heading uppercase text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Despacho a Pie de Obra
            </h3>
            <p className="mt-3 text-sm text-bronto-gray font-sans leading-relaxed">
              Coordinación de camas bajas y camiones grúa con rutas directas por Calle 80, Autonorte y variante Siberia-Cota-Chía.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-[#2B2B2B] flex items-center gap-2 text-xs font-mono text-white/80">
            <CheckCircle2 className="w-4 h-4 text-bronto-yellow shrink-0" />
            <span>Llegada puntual programada</span>
          </div>
        </div>
      </div>

      {/* Banner Panorámico Full Width */}
      <div className="relative z-10 w-full overflow-hidden rounded-sm border border-[#2B2B2B] bg-[#1E1E1E]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 filter grayscale contrast-125"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?q=80&w=2400&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/85 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-bronto-yellow font-bold block mb-1">
              DISPONIBILIDAD INMEDIATA EN BOGOTÁ Y SABANA
            </span>
            <h3 className="font-heading uppercase text-2xl sm:text-3xl font-black text-white">
              ¿TIENE UNA FUNDIDA O UN FRENTE URGENTE?
            </h3>
            <p className="text-xs sm:text-sm text-bronto-gray font-sans mt-1">
              Contacte a nuestro equipo de despacho para coordinar maquinaria o suministro a obra en tiempo récord.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/cotizar"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#151515] font-black text-xs uppercase tracking-wider rounded-sm transition-colors"
            >
              <span>Cotizar disponibilidad</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
