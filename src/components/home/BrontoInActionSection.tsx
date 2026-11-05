"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const BrontoInActionSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#0E0E0E] border-b border-[#242424] py-14 px-6 sm:px-10 lg:px-16 2xl:px-24"
      aria-label="Capacidad operativa de BRONTO"
    >
      {/* Cabecera */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242424]">
        <div>
          <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight">
            Capacidad operativa en obra
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl font-normal">
            Alistamiento mecánico estricto, control de horómetros y rutas de transporte directo para los corredores de la Sabana.
          </p>
        </div>
        <div className="text-xs text-white/60 font-medium tracking-wide">
          Centro de Despacho &bull; Calle 80 / Siberia
        </div>
      </div>

      {/* 3 Bloques Estructurales de Ingeniería */}
      <div className="w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch flex-1">
        {/* Bloque 1 */}
        <div className="bg-[#141414] border-t-2 border-bronto-yellow p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs text-bronto-yellow uppercase font-bold tracking-wider block mb-3">
              Inspección Previa
            </span>
            <h3 className="text-white text-2xl font-black uppercase tracking-tight">
              Protocolo de 40 puntos
            </h3>
            <p className="mt-4 text-sm text-white/70 leading-relaxed font-normal">
              Revisión previa de presiones hidráulicas, niveles de fluidos, sistema de frenos y calibración de horómetros antes de que la maquinaria salga a su frente de trabajo.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/50">
            Entrega con acta técnica digital y check-list conjunto con el residente de obra.
          </div>
        </div>

        {/* Bloque 2 */}
        <div className="bg-[#141414] border-t-2 border-white/40 p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs text-white/60 uppercase font-bold tracking-wider block mb-3">
              Monitoreo Activo
            </span>
            <h3 className="text-white text-2xl font-black uppercase tracking-tight">
              Telemetría y soporte in situ
            </h3>
            <p className="mt-4 text-sm text-white/70 leading-relaxed font-normal">
              Supervisión de parámetros de motor y temperatura en flota pesada para coordinar mantenimientos preventivos y cambio de filtros sin frenar la jornada constructiva.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/50">
            Cuadrilla de técnicos móviles equipados para intervención inmediata en campo.
          </div>
        </div>

        {/* Bloque 3 */}
        <div className="bg-[#141414] border-t-2 border-white/40 p-8 flex flex-col justify-between">
          <div>
            <span className="text-xs text-white/60 uppercase font-bold tracking-wider block mb-3">
              Logística Pesada
            </span>
            <h3 className="text-white text-2xl font-black uppercase tracking-tight">
              Movilización en cama baja
            </h3>
            <p className="mt-4 text-sm text-white/70 leading-relaxed font-normal">
              Coordinación de camas bajas, camiones grúa y vehículos de respuesta rápida con permisos viales para transporte directo a Bogotá, Chía, Cota, Mosquera y Soacha.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/50">
            Puntualidad en descargue con operadores calificados y señalización de seguridad.
          </div>
        </div>
      </div>

      {/* Franja de Solicitud Directa */}
      <div className="w-full bg-[#181818] border border-[#262626] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-white font-bold block text-sm sm:text-base uppercase tracking-tight">
            ¿Tiene una fundida o un frente urgente esta semana?
          </span>
          <span className="text-white/60 text-xs block mt-0.5">
            Coordine la disponibilidad de equipos con nuestro equipo de despacho técnico.
          </span>
        </div>
        <Link
          href="/cotizar"
          className="inline-flex items-center gap-2 px-6 py-3 bg-bronto-yellow hover:bg-bronto-yellow-hover text-[#111111] font-black text-xs uppercase tracking-wider rounded-none shrink-0"
        >
          <span>Cotizar disponibilidad</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </Link>
      </div>
    </section>
  );
};
